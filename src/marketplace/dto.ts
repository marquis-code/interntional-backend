import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsString()
  fileUrl: string;

  @IsString()
  category: string;

  @IsEnum(['internTional', 'uniVerse'])
  environment: string;
}

export class PurchaseProductDto {
  @IsString()
  productId: string;

  @IsString()
  reference: string;
}
