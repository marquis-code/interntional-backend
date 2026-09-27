export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    verificationFileUrl: string;
    country?: string;
    phoneNumber?: string;
    professionalBackground?: string;
    universityId?: string;
    programmeId?: string;
    planId?: string;
    callbackUrl?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class SetupPasswordDto {
    token: string;
    password: string;
}
export declare class ForgotPasswordDto {
    email: string;
    source?: 'intern' | 'universe';
}
export declare class ResetPasswordDto {
    token: string;
    password: string;
}
