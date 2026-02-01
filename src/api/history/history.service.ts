import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { QueryHistoryDto } from './dto/query-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService extends BaseService<
  CreateHistoryDto,
  UpdateHistoryDto
> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'history');
  }

  findAllWithPhotos(queryHistoryDto?: QueryHistoryDto) {
    const options = { ...queryHistoryDto, includes: { photos: true } };
    return this.findAll(options);
  }

  findAllWithDefects(queryHistoryDto?: QueryHistoryDto) {
    const options = { ...queryHistoryDto, includes: { defects: true } };
    return this.findAll(options);
  }

  findAllWithAll(queryHistoryDto?: QueryHistoryDto) {
    const options = { ...queryHistoryDto, includes: { all: true } };
    return this.findAll(options);
  }
}
