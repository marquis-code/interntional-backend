export class RegisterDto {
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

export class LoginDto {
  email: string;
  password: string;
}

export class SetupPasswordDto {
  token: string;
  password: string;
}

export class ForgotPasswordDto {
  email: string;
  source?: 'intern' | 'universe';
}

export class ResetPasswordDto {
  token: string;
  password: string;
}
