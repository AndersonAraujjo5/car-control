import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  carId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  date: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  fuel: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  km: number;

  @IsNotEmpty()
  @IsEnum(HistoryStatus)
  @ApiProperty()
  status?: 'ENTRY' | 'EXIT';
}
