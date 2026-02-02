import { IsOptional } from 'class-validator';
import { HistoryStatus } from 'generated/prisma/client';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryHistoryDto extends QueryDto {
  @IsOptional()
  declare includes?: 'photos' | 'defects' | 'all';
  @IsOptional()
  date?: Date;
  @IsOptional()
  location?: string;
  @IsOptional()
  status?: HistoryStatus;
}
