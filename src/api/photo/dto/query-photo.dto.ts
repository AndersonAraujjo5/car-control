import { IsNumberString, IsOptional, MinLength } from 'class-validator';

export class QueryPhotoDto {
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  offset?: number;
  @IsOptional()
  @MinLength(0)
  @IsNumberString()
  limit?: number;
}
