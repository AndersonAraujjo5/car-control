import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNumber()
  @IsNotEmpty()
  historyId: number;
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  filename: string;
}
