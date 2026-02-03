import { Injectable } from '@nestjs/common';
import { QueryDto } from 'src/common/dto/query.dto';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateFuelFullDto } from './dto/create-fuel-full.dto';
import { UpdateFuelFullDto } from './dto/update-fuel-full.dto';

@Injectable()
export class FuelFullService extends BaseService<
  CreateFuelFullDto,
  UpdateFuelFullDto
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'fuelFull');
  }

  findFullByCarId(id: number, Query?: QueryDto) {
    return this.findAll({ ...Query, where: { carId: id } });
  }

  findFullByUserId(id: number, Query?: QueryDto) {
    return this.findAll({ ...Query, where: { userId: id } });
  }
}
