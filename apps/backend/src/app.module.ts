import { Module } from '@nestjs/common';

import { LoggerModule } from './common/logger';
import { DatabaseModule } from './infrastructure/database';
import { HealthModule } from './modules/health';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/users';
import { MarketDataModule } from './modules/market-data';
import { CacheModule } from './infrastructure/cache';
@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    CacheModule,
    HealthModule,
    UserModule,
    AuthModule,
    MarketDataModule,
  ],
})
export class AppModule {}