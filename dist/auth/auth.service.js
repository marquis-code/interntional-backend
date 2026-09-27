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
        const user = await this.usersService.findByEmail(loginDto.email);
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