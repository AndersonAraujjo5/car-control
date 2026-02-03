import { Module } from '@nestjs/common';
import { FuelFullModule } from '../fuel-full/fuel-full.module';
import { HistoryModule } from '../history/history.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';

@Module({
  imports: [HistoryModule, FuelFullModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
