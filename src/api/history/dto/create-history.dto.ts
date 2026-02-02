import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { HistoryStatus } from 'generated/prisma/enums';

export class CreateHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  fuel: number;

  @IsNotEmpty()
  @IsNumber()
  km: number;

  @IsNotEmpty()
  @IsEnum(HistoryStatus)
  status?: 'ENTRY' | 'EXIT';
}
