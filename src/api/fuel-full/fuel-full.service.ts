import { Injectable } from '@nestjs/common';
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
}
