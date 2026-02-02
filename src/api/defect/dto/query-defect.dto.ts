import { IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryDefectDto extends QueryDto {
  @IsOptional()
  name?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  date?: Date;
}
