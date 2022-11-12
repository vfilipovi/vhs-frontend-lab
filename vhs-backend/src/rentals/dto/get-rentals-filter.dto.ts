import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class GetRentalsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
