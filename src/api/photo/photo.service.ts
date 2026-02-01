import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService extends BaseService<CreatePhotoDto, UpdatePhotoDto> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'photo');
  }
}
