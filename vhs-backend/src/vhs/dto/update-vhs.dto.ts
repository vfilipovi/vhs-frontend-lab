import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateVhsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  releasedAt?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  rentalPrice?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  rentalDuration?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  quantity?: number;
}
