import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  @Length(3, 255, { message: 'Name must be between 3 and 255 characters' })
  @ApiProperty({ description: 'Name must be a string', example: 'John Doe' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Document must be a string' })
  @ApiProperty({
    description: 'Document must be a string',
    example: '123456789',
  })
  document: string;

  @IsNotEmpty()
  @IsString({ message: 'Username must be a string' })
  @ApiProperty({ description: 'Username must be a string', example: 'johndoe' })
  username: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @ApiProperty({ description: 'Password must be at least 6 characters' })
  password: string;
}
