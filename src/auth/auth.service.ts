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
    const user = await this.usersService.findByEmail(loginDto.email);
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
}
