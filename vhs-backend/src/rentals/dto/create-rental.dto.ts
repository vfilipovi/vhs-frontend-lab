import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRentalDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  vhsId: number;
}
