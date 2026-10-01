import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, SetupPasswordDto, ForgotPasswordDto, ResetPasswordDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        authorization_url: string | undefined;
    }>;
    login(loginDto: LoginDto): Promise<{
        requireOtp: boolean;
        message: string;
        email: string;
    }>;
    verifyLoginOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
            department: import("../users/schemas/user.schema").Department;
            permissions: string[];
        };
    }>;
    resendLoginOtp(body: {
        email: string;
        source?: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    setupPassword(setupDto: SetupPasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(forgotDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    sendOtp(body: {
        email: string;
        firstName: string;
        source?: string;
    }): Promise<{
        message: string;
    }>;
    verifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        success: boolean;
        emailVerified: boolean;
    }>;
    adminLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        email: string;
    }>;
    adminVerifyOtp(body: {
        email: string;
        otp: string;
    }): Promise<{
        access_token: string;
        user: {
            id: import("mongoose").Types.ObjectId;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
            department: import("../users/schemas/user.schema").Department;
            permissions: string[];
            adminPlatform: string | undefined;
        };
    }>;
    adminResendOtp(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    adminForgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    adminResetPassword(body: {
        token: string;
        password: string;
    }): Promise<{
        message: string;
    }>;
    acceptAdminInvite(body: {
        token: string;
        firstName: string;
        lastName: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../users/schemas/user.schema").UserRole;
            permissions: string[];
            adminPlatform: string | undefined;
        };
    }>;
    getProfile(req: any): Promise<import("../users/schemas/user.schema").UserDocument>;
}
