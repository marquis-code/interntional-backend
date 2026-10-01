"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = exports.ForgotPasswordDto = exports.SetupPasswordDto = exports.LoginDto = exports.RegisterDto = void 0;
class RegisterDto {
    firstName;
    lastName;
    email;
    password;
    verificationFileUrl;
    country;
    phoneNumber;
    professionalBackground;
    universityId;
    programmeId;
    planId;
    callbackUrl;
}
exports.RegisterDto = RegisterDto;
class LoginDto {
    email;
    password;
    source;
}
exports.LoginDto = LoginDto;
class SetupPasswordDto {
    token;
    password;
}
exports.SetupPasswordDto = SetupPasswordDto;
class ForgotPasswordDto {
    email;
    source;
}
exports.ForgotPasswordDto = ForgotPasswordDto;
class ResetPasswordDto {
    token;
    password;
}
exports.ResetPasswordDto = ResetPasswordDto;
//# sourceMappingURL=auth.dto.js.map