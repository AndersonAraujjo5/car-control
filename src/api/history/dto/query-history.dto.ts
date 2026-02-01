import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryHistoryDto extends QueryDto {
  @IsOptional()
  @IsString()
  declare includes?: 'photos' | 'defects' | 'all';
}
