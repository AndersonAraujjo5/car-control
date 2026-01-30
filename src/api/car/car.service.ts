import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService extends BaseService<CreateCarDto, UpdateCarDto> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'car');
  }

  findAllWithHistories(queryCarDto?: QueryCarDto) {
    return this.findAll({
      ...queryCarDto,
      includes: {
        histories: true,
      },
    });
  }

  findAllWithFuelFulls(queryCarDto?: QueryCarDto) {
    return this.findAll({
      ...queryCarDto,
      includes: {
        fuelFulls: true,
      },
    });
  }

  findAllWithAll(queryCarDto?: QueryCarDto) {
    return this.findAll({
      ...queryCarDto,
      includes: {
        histories: true,
        fuelFulls: true,
      },
    });
  }
}
