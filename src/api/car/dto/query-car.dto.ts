import {
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class QueryCarDto {
  @IsOptional()
  @IsString()
  includes?: 'histories' | 'fuelFulls' | 'all';

  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  offset?: number;
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  limit?: number;
}
