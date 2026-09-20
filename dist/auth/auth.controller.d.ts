import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
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
}
