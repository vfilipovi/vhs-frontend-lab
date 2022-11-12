import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetVhsFilterDto {
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
  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  isAvailable?: boolean;
}
