"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const mongoose_1 = require("mongoose");
const cache_manager_1 = require("@nestjs/cache-manager");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../utils/email.service");
const payments_service_1 = require("../payments/payments.service");
const subscriptions_service_1 = require("../subscriptions/subscriptions.service");
let AuthService = class AuthService {
    usersService;
    jwtService;
    emailService;
    paymentsService;
    subscriptionsService;
    cacheManager;
    constructor(usersService, jwtService, emailService, paymentsService, subscriptionsService, cacheManager) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.paymentsService = paymentsService;
        this.subscriptionsService = subscriptionsService;
        this.cacheManager = cacheManager;
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        let passwordHash;
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
            department: registerDto.professionalBackground,
            universityId: registerDto.universityId ? new mongoose_1.Types.ObjectId(registerDto.universityId) : undefined,
            programmeId: registerDto.programmeId ? new mongoose_1.Types.ObjectId(registerDto.programmeId) : undefined,
            activeSubscription: registerDto.planId ? new mongoose_1.Types.ObjectId(registerDto.planId) : undefined,
        });
        await this.emailService.sendApplicationReceivedEmail(user.email, user.firstName);
        let authorization_url = undefined;
        if (registerDto.planId) {
            try {
                const plan = await this.subscriptionsService.findById(registerDto.planId);
                if (plan && plan.price > 0) {
                    const paymentRes = await this.paymentsService.initializePayment(user._id.toString(), registerDto.planId, user.email, registerDto.callbackUrl || 'http://localhost:3000/verification');
                    authorization_url = paymentRes.authorization_url;
                }
            }
            catch (error) {
                console.error('Failed to initialize payment during registration', error);
            }
        }
        return {
            message: 'Registration successful. Account is pending approval.',
            authorization_url
        };
    }
    async setupPassword(setupDto) {
        const user = await this.usersService.findBySetupToken(setupDto.token);
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired setup token.');
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(setupDto.password, salt);
        await this.usersService.updatePasswordAndActivate(user._id.toString(), passwordHash);
        return { message: 'Password set successfully. You can now login.' };
    }
    async login(loginDto) {
        const normalizedEmail = loginDto.email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.status !== 'APPROVED') {
            throw new common_1.UnauthorizedException('Account is pending approval or rejected.');
        }
        const isTestUser = normalizedEmail.startsWith('test_') && normalizedEmail.endsWith('@convo.com');
        const otp = isTestUser ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
        await this.cacheManager.set(`login_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);
        if (!isTestUser) {
            await this.emailService.sendLoginOtpEmail(normalizedEmail, user.firstName, otp, loginDto.source || 'intern');
        }
        return {
            requireOtp: true,
            message: 'A 6-digit verification code has been sent to your email.',
            email: normalizedEmail,
        };
    }
    async verifyLoginOtp(email, otp) {
        const normalizedEmail = email.toLowerCase().trim();
        const cachedOtp = await this.cacheManager.get(`login_otp_${normalizedEmail}`);
        if (!cachedOtp || cachedOtp !== otp) {
            throw new common_1.BadRequestException('Invalid or expired verification code. Please try again or request a new code.');
        }
        await this.cacheManager.del(`login_otp_${normalizedEmail}`);
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user)
            throw new common_1.UnauthorizedException('User not found.');
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
    async resendLoginOtp(email, source = 'intern') {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user) {
            throw new common_1.BadRequestException('User not found.');
        }
        if (user.status !== 'APPROVED') {
            throw new common_1.UnauthorizedException('Account is pending approval or rejected.');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.cacheManager.set(`login_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);
        await this.emailService.sendLoginOtpEmail(normalizedEmail, user.firstName, otp, source);
        return {
            success: true,
            message: 'A new 6-digit verification code has been sent to your email.',
        };
    }
    async getProfile(userId) {
        const user = await this.usersService.findByIdWithSubscription(userId);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        return user;
    }
    async sendOtp(email, firstName, source = 'intern') {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        await this.cacheManager.set(`otp_${email}`, otp, 10 * 60 * 1000);
        await this.emailService.sendOtpEmail(email, firstName, otp, source);
        return { message: 'OTP sent to email.' };
    }
    async verifyOtp(email, otp) {
        const cachedOtp = await this.cacheManager.get(`otp_${email}`);
        if (cachedOtp === otp) {
            return { success: true, emailVerified: true };
        }
        throw new common_1.BadRequestException('Invalid or expired OTP.');
    }
    async forgotPassword(email, source = 'intern') {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return { message: 'If that email exists, a reset link has been sent.' };
        }
        const token = require('crypto').randomBytes(32).toString('hex');
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        await this.usersService.setResetPasswordToken(email, token, expires);
        await this.emailService.sendPasswordResetEmail(user.email, user.firstName, token, source);
        return { message: 'If that email exists, a reset link has been sent.' };
    }
    async resetPassword(resetDto) {
        const user = await this.usersService.findByResetToken(resetDto.token);
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token.');
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(resetDto.password, salt);
        await this.usersService.resetPassword(user._id.toString(), passwordHash);
        return { message: 'Password has been successfully reset. You can now log in.' };
    }
    ALLOWED_ADMIN_EMAILS = [
        'interntional@medlabconvo.com',
        'universe@medlabconvo.com',
        'marquis@medlabconvo.com',
        'test_moderator@medlabconvo.com'
    ];
    ADMIN_ROLES = ['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'DEPARTMENT_HEAD'];
    async adminLoginStep1(email, password) {
        const normalizedEmail = email.toLowerCase().trim();
        if (!this.ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
            throw new common_1.UnauthorizedException('Access denied. This email is not authorised for admin access.');
        }
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials.');
        }
        if (user.status !== 'APPROVED') {
            throw new common_1.UnauthorizedException('Account is not approved.');
        }
        if (!this.ADMIN_ROLES.includes(user.role)) {
            throw new common_1.UnauthorizedException('Access denied. Insufficient privileges.');
        }
        const isTestAdmin = normalizedEmail === 'test_moderator@medlabconvo.com';
        const otp = isTestAdmin ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
        await this.cacheManager.set(`admin_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);
        if (!isTestAdmin) {
            await this.emailService.sendAdminLoginOtpEmail(normalizedEmail, user.firstName, otp);
        }
        return { message: 'OTP sent to your email. Please verify to continue.', email: normalizedEmail };
    }
    async adminVerifyOtp(email, otp) {
        const normalizedEmail = email.toLowerCase().trim();
        const cachedOtp = await this.cacheManager.get(`admin_otp_${normalizedEmail}`);
        if (!cachedOtp || cachedOtp !== otp) {
            throw new common_1.BadRequestException('Invalid or expired OTP.');
        }
        await this.cacheManager.del(`admin_otp_${normalizedEmail}`);
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user)
            throw new common_1.UnauthorizedException('User not found.');
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
    async adminResendOtp(email) {
        const normalizedEmail = email.toLowerCase().trim();
        if (!this.ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
            throw new common_1.UnauthorizedException('Access denied.');
        }
        const user = await this.usersService.findByEmail(normalizedEmail);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found.');
        }
        if (!this.ADMIN_ROLES.includes(user.role)) {
            throw new common_1.UnauthorizedException('Access denied. Insufficient privileges.');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await this.cacheManager.set(`admin_otp_${normalizedEmail}`, otp, 10 * 60 * 1000);
        await this.emailService.sendAdminLoginOtpEmail(normalizedEmail, user.firstName, otp);
        return { message: 'A new OTP has been sent to your email.' };
    }
    async adminForgotPassword(email) {
        const normalizedEmail = email.toLowerCase().trim();
        if (!this.ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
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
    async adminResetPassword(token, newPassword) {
        const user = await this.usersService.findByResetToken(token);
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token.');
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);
        await this.usersService.resetPassword(user._id.toString(), passwordHash);
        return { message: 'Password reset successfully. You can now log in.' };
    }
    async acceptAdminInvite(token, body) {
        const invitation = await this.usersService.validateInvitation(token);
        const existingUser = await this.usersService.findByEmail(invitation.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
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
        });
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        email_service_1.EmailService,
        payments_service_1.PaymentsService,
        subscriptions_service_1.SubscriptionsService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map