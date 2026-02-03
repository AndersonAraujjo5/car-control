import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryCarDto extends QueryDto {
  @IsOptional()
  @ApiProperty({
    description: 'histories | fuelFulls | all',
    required: false,
    enum: ['histories', 'fuelFulls', 'all'],
  })
  declare includes?: 'histories' | 'fuelFulls' | 'all';
  @IsOptional()
  @ApiProperty({
    description: 'Plate must be a string',
    example: 'ABC1234',
    required: false,
  })
  plate?: string;
  @IsOptional()
  @ApiProperty({
    description: 'Model must be a string',
    example: 'Honda Civic',
    required: false,
  })
  model?: string;
  @IsOptional()
  @ApiProperty({
    description: 'Document must be a string',
    example: '123456789',
    required: false,
  })
  document?: string;
}
