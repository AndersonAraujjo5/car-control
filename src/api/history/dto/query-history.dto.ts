import {
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class QueryHistoryDto {
  @IsOptional()
  @IsString()
  includes?: 'photos' | 'defects' | 'all';
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  offset?: number;
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  limit?: number;
}
