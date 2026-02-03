import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFuelFullDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'User id' })
  userId: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'Car id' })
  carId: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'Liter' })
  liter: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'Price' })
  price: number;
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true, description: 'Date' })
  date: Date;
}
