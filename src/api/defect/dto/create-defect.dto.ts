import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDefectDto {
  @IsNotEmpty()
  @IsNumber()
  historyId: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  @IsString()
  description: string;
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;
}
