import { Injectable } from '@nestjs/common';
import { QueryDto } from 'src/common/dto/query.dto';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@Injectable()
export class HistoryService extends BaseService<
  CreateHistoryDto,
  UpdateHistoryDto
> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'history');
  }

  findHistoryByCarId(id: number, query?: QueryDto) {
    const response = this.findAll({
      ...query,
      where: { carId: id },
    });
    return response;
  }

  findHistoryByUserId(id: number, query?: QueryDto) {
    const response = this.findAll({
      ...query,
      where: { userId: id },
    });
    return response;
  }
}
