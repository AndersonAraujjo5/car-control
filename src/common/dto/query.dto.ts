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
  offset?: number;
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  limit?: number;
  @IsOptional()
  includes?: object | string = {};
  @IsOptional()
  @IsString()
  orderBy?: 'desc' | 'asc';
}
