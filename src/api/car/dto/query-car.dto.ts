import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryCarDto extends QueryDto {
  @IsOptional()
  @IsString()
  declare includes?: 'histories' | 'fuelFulls' | 'all';
}
