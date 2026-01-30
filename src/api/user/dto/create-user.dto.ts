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
  name: string;

  @IsOptional()
  @IsString({ message: 'Document must be a string' })
  document: string;

  @IsNotEmpty()
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
