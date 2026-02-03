import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class QueryUserDto extends QueryDto {
  @IsOptional()
  @ApiProperty({
    description: 'histories | fuelFulls | all',
    required: false,
    enum: ['histories', 'fuelFulls', 'all'],
  })
  declare includes?: 'histories' | 'fuelFulls' | 'all';
  @IsOptional()
  @ApiProperty({
    description: 'Name must be a string',
    example: 'John Doe',
    required: false,
  })
  name?: string;
  @IsOptional()
  @ApiProperty({
    description: 'Username must be a string',
    example: 'johndoe',
    required: false,
  })
  username?: string;
  @IsOptional()
  @ApiProperty({
    description: 'Document must be a string',
    example: '123456789',
    required: false,
  })
  document?: string;
}
