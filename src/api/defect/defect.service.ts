import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';

@Injectable()
export class DefectService extends BaseService<
  CreateDefectDto,
  UpdateDefectDto
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'defect');
  }
}
