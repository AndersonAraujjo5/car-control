import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true, description: 'History id' })
  historyId: number;
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, required: true, description: 'Filename' })
  filename: string;
}
