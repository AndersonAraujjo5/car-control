import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './api/car/car.module';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { HistoryModule } from './api/history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CarModule,
    UserModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
