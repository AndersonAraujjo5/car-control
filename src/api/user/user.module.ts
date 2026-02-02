import { Module } from '@nestjs/common';
import { FuelFullModule } from '../fuel-full/fuel-full.module';
import { HistoryModule } from '../history/history.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HistoryModule, FuelFullModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
