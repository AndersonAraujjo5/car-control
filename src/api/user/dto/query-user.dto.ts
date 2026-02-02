import { IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @IsOptional()
  declare includes?: 'histories' | 'fuelFulls' | 'all';
  @IsOptional()
  name?: string;
  @IsOptional()
  username?: string;
  @IsOptional()
  document?: string;
}
