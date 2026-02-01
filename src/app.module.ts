import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './api/car/car.module';
import { HistoryModule } from './api/history/history.module';
import { PhotoModule } from './api/photo/photo.module';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { FuelFullModule } from './api/fuel-full/fuel-full.module';
import { DefectModule } from './api/defect/defect.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CarModule,
    UserModule,
    HistoryModule,
    PhotoModule,
    FuelFullModule,
    DefectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
