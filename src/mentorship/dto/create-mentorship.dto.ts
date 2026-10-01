import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CreateMentorshipDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  areaOfInterest: string;

  @IsString()
  @IsEnum(['universe', 'interntional'])
  application: string;
}

export class UpdateMentorshipStatusDto {
  @IsString()
  @IsEnum(['pending', 'matched', 'completed', 'cancelled'])
  status: string;

  @IsOptional()
  @IsString()
  matchedMentor?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
