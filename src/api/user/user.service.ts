import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { FuelFullService } from '../fuel-full/fuel-full.service';
import { HistoryService } from '../history/history.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends BaseService<CreateUserDto, UpdateUserDto> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
    private readonly fuelFullService: FuelFullService,
  ) {
    super(prismaService, 'user');
  }

  findHistory(id: number, query?: QueryUserDto) {
    return this.historyService.findHistoryByUserId(+id, query);
  }

  findFuelFull(id: number, query?: QueryUserDto) {
    return this.fuelFullService.findFullByUserId(+id, query);
  }
}
