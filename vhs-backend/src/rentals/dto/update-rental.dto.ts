import { IsISO8601, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRentalDto {
  @IsOptional()
  @IsNotEmpty()
  @IsISO8601()
  returned_at?: Date;
}
