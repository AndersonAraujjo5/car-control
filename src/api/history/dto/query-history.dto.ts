import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { HistoryStatus } from 'generated/prisma/client';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryHistoryDto extends QueryDto {
  @IsOptional()
  @ApiProperty({
    description: 'photos | defects | all',
    required: false,
    enum: ['photos', 'defects', 'all'],
  })
  declare includes?: 'photos' | 'defects' | 'all';

  @IsOptional()
  @ApiProperty({
    description: 'yyyy-mm-dd',
    required: false,
    type: () => Date,
  })
  date?: Date;

  @IsOptional()
  @ApiProperty({
    description: 'location',
    required: false,
  })
  location?: string;

  @IsOptional()
  @ApiProperty({
    enum: HistoryStatus,
    required: false,
  })
  status?: HistoryStatus;
}
