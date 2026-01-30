import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends BaseService<CreateUserDto, UpdateUserDto> {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService, 'user');
  }
}
