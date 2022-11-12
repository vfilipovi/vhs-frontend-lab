import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVhsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  releasedAt: number;

  @IsNotEmpty()
  @IsNumber()
  rentalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  rentalDuration: number;
}
