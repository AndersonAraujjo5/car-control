import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: Number,
    required: true,
    description: 'History id',
  })
  historyId: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    type: String,
    required: true,
    description: 'Name',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'Description',
  })
  description: string;
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    required: true,
    description: 'Date',
  })
  date: Date;
}
