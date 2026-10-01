import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreateBountyDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsEnum(['cv_review', 'mock_interview', 'career_planning', 'freelance_consulting'])
  category: string;

  @IsEnum(['internTional', 'uniVerse'])
  environment: string;
}

export class BookBountyDto {
  @IsString()
  bountyId: string;

  @IsString()
  reference: string;

  @IsOptional()
  @IsString()
  clientNotes?: string;
}
