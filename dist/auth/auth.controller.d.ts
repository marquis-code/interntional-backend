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
    getProfile(req: any): Promise<import("../users/schemas/user.schema").UserDocument>;
}
