export class RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  verificationFileUrl: string;
  country?: string;
  phoneNumber?: string;
  professionalBackground?: string;
  universityId?: string;
  programmeId?: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export class SetupPasswordDto {
  token: string;
  password: string;
}
