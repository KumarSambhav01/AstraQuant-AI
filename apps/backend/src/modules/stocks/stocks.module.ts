import { Module } from '@nestjs/common';

import { MarketDataModule } from '../market-data';

import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [MarketDataModule],
  controllers: [StocksController],
  providers: [StocksService],
  exports: [StocksService],
})
export class StocksModule {}