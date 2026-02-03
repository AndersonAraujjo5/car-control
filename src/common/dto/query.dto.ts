import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class QueryDto {
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  @ApiProperty({
    required: false,
    minimum: 0,
  })
  offset?: number;
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  @ApiProperty({
    required: false,
    minimum: 10,
  })
  limit?: number;
  @IsOptional()
  includes?: object | string = {};
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    enum: ['desc', 'asc'],
  })
  orderBy?: 'desc' | 'asc';
  @IsOptional()
  where?: object = {};
}
