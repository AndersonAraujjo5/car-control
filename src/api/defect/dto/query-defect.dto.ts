import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryDefectDto extends QueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  name?: string;
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  description?: string;
  @IsOptional()
  @ApiProperty({
    required: false,
    type: () => Date,
  })
  date?: Date;
}
