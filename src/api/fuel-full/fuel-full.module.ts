import { Module } from '@nestjs/common';
import { FuelFullController } from './fuel-full.controller';
import { FuelFullService } from './fuel-full.service';

@Module({
  controllers: [FuelFullController],
  providers: [FuelFullService],
})
export class FuelFullModule {}
