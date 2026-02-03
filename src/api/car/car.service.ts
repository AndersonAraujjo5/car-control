import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { FuelFullService } from '../fuel-full/fuel-full.service';
import { HistoryService } from '../history/history.service';
import { CreateCarDto } from './dto/create-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService extends BaseService<CreateCarDto, UpdateCarDto> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
    private readonly fuelFullService: FuelFullService,
  ) {
    super(prismaService, 'car');
  }

  findHistory(id: number, query?: QueryCarDto) {
    return this.historyService.findHistoryByCarId(id, query);
  }

  findFuelFull(id: number, query?: QueryCarDto) {
    return this.fuelFullService.findFullByCarId(id, query);
  }
}
