import { Module } from '@nestjs/common';

import { LoggerModule } from './common/logger';
import { DatabaseModule } from './infrastructure/database';
import { HealthModule } from './modules/health';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/users';
import { MarketDataModule } from './modules/market-data';
import { CacheModule } from './infrastructure/cache';
import { StocksModule } from './modules/stocks';
import { WatchlistsModule } from './modules/watchlists';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    CacheModule,
    HealthModule,
    UserModule,
    AuthModule,
    MarketDataModule,
    StocksModule,
    WatchlistsModule,
  ],
})
export class AppModule {}