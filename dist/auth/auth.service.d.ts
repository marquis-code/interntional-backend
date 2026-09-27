import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import type { Cache } from 'cache-manager';
import { UsersService } from '../users/users.service';
import { EmailService } from '../utils/email.service';
import { RegisterDto, LoginDto, SetupPasswordDto } from './auth.dto';
import { PaymentsService } from '../payments/payments.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private emailService;
    private paymentsService;
    private subscriptionsService;
    private cacheManager;
    constructor(usersService: UsersService, jwtService: JwtService, emailService: EmailService, paymentsService: PaymentsService, subscriptionsService: SubscriptionsService, cacheManager: Cache);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        authorization_url: string | undefined;
    }>;
    setupPassword(setupDto: SetupPasswordDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: Types.ObjectId;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
            department: import("../users/schemas/user.schema").Department;
            permissions: string[];
        };
    }>;
    getProfile(userId: string): Promise<import("../users/schemas/user.schema").UserDocument>;
    sendOtp(email: string, firstName: string, source?: 'intern' | 'universe'): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        success: boolean;
        emailVerified: boolean;
    }>;
    forgotPassword(email: string, source?: 'intern' | 'universe'): Promise<{
        message: string;
    }>;
    resetPassword(resetDto: {
        token: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    private readonly ALLOWED_ADMIN_EMAILS;
    private readonly ADMIN_ROLES;
    adminLoginStep1(email: string, password: string): Promise<{
        message: string;
        email: string;
    }>;
    adminVerifyOtp(email: string, otp: string): Promise<{
        access_token: string;
        user: {
            id: Types.ObjectId;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
            department: import("../users/schemas/user.schema").Department;
            permissions: string[];
        };
    }>;
    adminForgotPassword(email: string): Promise<{
        message: string;
    }>;
    adminResetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
