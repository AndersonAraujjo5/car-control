import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFuelFullDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsNumber()
  @IsNotEmpty()
  carId: number;
  @IsNumber()
  @IsNotEmpty()
  liter: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;
}
