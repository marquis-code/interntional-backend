export class RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  verificationFileUrl: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class SetupPasswordDto {
  token: string;
  password: string;
}
