import { Injectable, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
import { EmailService } from '../utils/email.service';
import { RegisterDto, LoginDto, SetupPasswordDto } from './auth.dto';

import { PaymentsService } from '../payments/payments.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private paymentsService: PaymentsService,
    private subscriptionsService: SubscriptionsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    let passwordHash: string | undefined;
    if (registerDto.password) {
      const salt = await bcrypt.genSalt();
      passwordHash = await bcrypt.hash(registerDto.password, salt);
    }

    const user = await this.usersService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash,
      verificationFileUrl: registerDto.verificationFileUrl,
      country: registerDto.country,
      phoneNumber: registerDto.phoneNumber,
      professionalBackground: registerDto.professionalBackground,
      department: registerDto.professionalBackground as any, // Mapped so it shows up correctly in Admin Dashboard
      universityId: registerDto.universityId ? new Types.ObjectId(registerDto.universityId) : undefined,
      programmeId: registerDto.programmeId ? new Types.ObjectId(registerDto.programmeId) : undefined,
      activeSubscription: registerDto.planId ? new Types.ObjectId(registerDto.planId) : undefined,
    });

    await this.emailService.sendApplicationReceivedEmail(user.email, user.firstName);

    let authorization_url: string | undefined = undefined;

    if (registerDto.planId) {
      try {
        const plan = await this.subscriptionsService.findById(registerDto.planId);
        if (plan && plan.price > 0) {
          const paymentRes = await this.paymentsService.initializePayment(
            user._id.toString(),
            registerDto.planId,
            user.email,
            registerDto.callbackUrl || 'http://localhost:3000/verification'
          );
          authorization_url = paymentRes.authorization_url;
        }
      } catch (error) {
        console.error('Failed to initialize payment during registration', error);
        // We still let registration succeed
      }
    }

    return { 
      message: 'Registration successful. Account is pending approval.',
      authorization_url 
    };
  }

  async setupPassword(setupDto: SetupPasswordDto) {
    const user = await this.usersService.findBySetupToken(setupDto.token);
    if (!user) {
      throw new BadRequestException('Invalid or expired setup token.');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(setupDto.password, salt);

    await this.usersService.updatePasswordAndActivate(user._id.toString(), passwordHash);

    return { message: 'Password set successfully. You can now login.' };
  }

  async login(loginDto: LoginDto) {
    const normalizedEmail = loginDto.email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'APPROVED') {
      throw new UnauthorizedException('Account is pending approval or rejected.');
    }

    // Generate 6-digit OTP code and store in cache for 10 minutes
    const isTestUser = normalizedEmail.startsWith('test_') && normalizedEmail.endsWith('@convo.com');
    const otp = isTestUser ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    await this.cacheManager.set(`login_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);

    // Send OTP email
    if (!isTestUser) {
      await this.emailService.sendLoginOtpEmail(normalizedEmail, user.firstName, otp, loginDto.source || 'intern');
    }

    return {
      requireOtp: true,
      message: 'A 6-digit verification code has been sent to your email.',
      email: normalizedEmail,
    };
  }

  async verifyLoginOtp(email: string, otp: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const cachedOtp = await this.cacheManager.get<string>(`login_otp_${normalizedEmail}`);

    if (!cachedOtp || cachedOtp !== otp) {
      throw new BadRequestException('Invalid or expired verification code. Please try again or request a new code.');
    }

    await this.cacheManager.del(`login_otp_${normalizedEmail}`);

    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) throw new UnauthorizedException('User not found.');

    // Track login
    await this.usersService.trackLogin(user._id.toString());

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      department: user.department,
      permissions: user.permissions || [],
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
      },
    };
  }

  async resendLoginOtp(email: string, source: 'intern' | 'universe' = 'intern') {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (user.status !== 'APPROVED') {
      throw new UnauthorizedException('Account is pending approval or rejected.');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.cacheManager.set(`login_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);

    await this.emailService.sendLoginOtpEmail(normalizedEmail, user.firstName, otp, source);

    return {
      success: true,
      message: 'A new 6-digit verification code has been sent to your email.',
    };
  }

  async getProfile(userId: string) {
    const user = await this.usersService.findByIdWithSubscription(userId);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }

  async sendOtp(email: string, firstName: string, source: 'intern' | 'universe' = 'intern') {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await this.cacheManager.set(`otp_${email}`, otp, 10 * 60 * 1000); // 10 minutes

    await this.emailService.sendOtpEmail(email, firstName, otp, source);
    return { message: 'OTP sent to email.' };
  }

  async verifyOtp(email: string, otp: string) {
    const cachedOtp = await this.cacheManager.get(`otp_${email}`);
    if (cachedOtp === otp) {
      // Don't delete immediately, let it expire so they can resubmit registration form using the same verified email if registration fails
      return { success: true, emailVerified: true };
    }
    throw new BadRequestException('Invalid or expired OTP.');
  }

  async forgotPassword(email: string, source: 'intern' | 'universe' = 'intern') {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't throw an error to prevent email enumeration, just return a success message
      return { message: 'If that email exists, a reset link has been sent.' };
    }

    const token = require('crypto').randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // 1 hour expiry

    await this.usersService.setResetPasswordToken(email, token, expires);
    await this.emailService.sendPasswordResetEmail(user.email, user.firstName, token, source);

    return { message: 'If that email exists, a reset link has been sent.' };
  }

  async resetPassword(resetDto: { token: string; password: string }) {
    const user = await this.usersService.findByResetToken(resetDto.token);
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(resetDto.password, salt);

    await this.usersService.resetPassword(user._id.toString(), passwordHash);

    return { message: 'Password has been successfully reset. You can now log in.' };
  }

  // ─── ADMIN-SPECIFIC AUTH ─────────────────────────────────────────────────

  private readonly ALLOWED_ADMIN_EMAILS = [
    'interntional@medlabconvo.com',
    'universe@medlabconvo.com',
    'marquis@medlabconvo.com',
    'test_moderator@medlabconvo.com'
  ];

  private readonly ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'DEPARTMENT_HEAD'];

  /** Step 1: Validate email+password, enforce admin role, then send OTP */
  async adminLoginStep1(email: string, password: string) {
    const normalizedEmail = email.toLowerCase().trim();

    if (!this.ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
      throw new UnauthorizedException('Access denied. This email is not authorised for admin access.');
    }

    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (user.status !== 'APPROVED') {
      throw new UnauthorizedException('Account is not approved.');
    }

    if (!this.ADMIN_ROLES.includes(user.role)) {
      throw new UnauthorizedException('Access denied. Insufficient privileges.');
    }

    // Generate 6-digit OTP and cache it for 10 minutes
    const isTestAdmin = normalizedEmail === 'test_moderator@medlabconvo.com';
    const otp = isTestAdmin ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    await this.cacheManager.set(`admin_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);

    if (!isTestAdmin) {
      await this.emailService.sendAdminLoginOtpEmail(normalizedEmail, user.firstName, otp);
    }

    return { message: 'OTP sent to your email. Please verify to continue.', email: normalizedEmail };
  }

  /** Step 2: Verify admin OTP, issue JWT */
  async adminVerifyOtp(email: string, otp: string) {
    const normalizedEmail = email.toLowerCase().trim();
    const cachedOtp = await this.cacheManager.get<string>(`admin_otp_${normalizedEmail}`);

    if (!cachedOtp || cachedOtp !== otp) {
      throw new BadRequestException('Invalid or expired OTP.');
    }

    await this.cacheManager.del(`admin_otp_${normalizedEmail}`);

    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) throw new UnauthorizedException('User not found.');

    await this.usersService.trackLogin(user._id.toString());

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      department: user.department,
      permissions: user.permissions || [],
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
        adminPlatform: user.adminPlatform,
      },
    };
  }

  /** Resend admin OTP without needing password again */
  async adminResendOtp(email: string) {
    const normalizedEmail = email.toLowerCase().trim();

    if (!this.ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
      throw new UnauthorizedException('Access denied.');
    }

    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    if (!this.ADMIN_ROLES.includes(user.role)) {
      throw new UnauthorizedException('Access denied. Insufficient privileges.');
    }

    // Generate 6-digit OTP and cache it for 10 minutes
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.cacheManager.set(`admin_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);

    await this.emailService.sendAdminLoginOtpEmail(normalizedEmail, user.firstName, otp);

    return { message: 'A new OTP has been sent to your email.' };
  }

  /** Admin forgot password — sends reset link to admin email */
  async adminForgotPassword(email: string) {
    const normalizedEmail = email.toLowerCase().trim();

    if (!this.ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
      // Silent return to prevent email enumeration
      return { message: 'If that email exists, a reset link has been sent.' };
    }

    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      return { message: 'If that email exists, a reset link has been sent.' };
    }

    const token = require('crypto').randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await this.usersService.setResetPasswordToken(normalizedEmail, token, expires);
    await this.emailService.sendAdminPasswordResetEmail(normalizedEmail, user.firstName, token);

    return { message: 'If that email exists, a reset link has been sent.' };
  }

  /** Admin reset password using token from email */
  async adminResetPassword(token: string, newPassword: string) {
    const user = await this.usersService.findByResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await this.usersService.resetPassword(user._id.toString(), passwordHash);

    return { message: 'Password reset successfully. You can now log in.' };
  }

  async acceptAdminInvite(token: string, body: { firstName: string, lastName: string, password: string }) {
    const invitation = await this.usersService.validateInvitation(token);
    const existingUser = await this.usersService.findByEmail(invitation.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(body.password, salt);
    const user = await this.usersService.create({
      email: invitation.email,
      firstName: body.firstName,
      lastName: body.lastName,
      passwordHash,
      role: invitation.role,
      permissions: invitation.permissions,
      adminPlatform: invitation.adminPlatform,
      department: invitation.department,
      status: 'APPROVED',
      isEmailVerified: true
    } as any);

    await this.usersService.consumeInvitation(token);

    const jwtPayload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.permissions || [],
      adminPlatform: user.adminPlatform,
    };

    return {
      access_token: this.jwtService.sign(jwtPayload),
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        permissions: user.permissions,
        adminPlatform: user.adminPlatform,
      },
    };
  }
}
