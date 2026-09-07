import { Injectable } from '@nestjs/common';

import {
  MarketDataService,
  MarketQuote,
} from '../market-data';

@Injectable()
export class StocksService {
  constructor(
    private readonly marketDataService: MarketDataService,
  ) {}

  async getStock(symbol: string): Promise<MarketQuote> {
    return this.marketDataService.getQuote(symbol);
  }
}