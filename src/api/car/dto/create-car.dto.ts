import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: 'Plate must be a string' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Plate must be a string',
    example: 'ABC1234',
    required: true,
  })
  plate: string;

  @IsString({ message: 'Model must be a string' })
  @IsNotEmpty()
  @Length(3, 255, { message: 'Model must be between 3 and 255 characters' })
  @ApiProperty({
    description: 'Model must be a string',
    example: 'Honda Civic',
    required: true,
  })
  model: string;

  @IsOptional()
  @IsString({ message: 'Document must be a string' })
  @ApiProperty({
    description: 'Document must be a string',
    example: '123456789',
    required: false,
  })
  document: string;
}
