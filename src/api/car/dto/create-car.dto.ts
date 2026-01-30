import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCarDto {
  @IsString({ message: 'Plate must be a string' })
  @IsNotEmpty()
  plate: string;

  @IsString({ message: 'Model must be a string' })
  @IsNotEmpty()
  @Length(3, 255, { message: 'Model must be between 3 and 255 characters' })
  model: string;

  @IsOptional()
  @IsString({ message: 'Document must be a string' })
  document: string;
}
