import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import {
  MarketDataService,
  MarketQuote,
} from './market-data.service';

@ApiTags('Market Data')
@Controller('market-data')
export class MarketDataController {
  constructor(
    private readonly marketDataService: MarketDataService,
  ) {}

  @Get('quote/:symbol')
  @ApiOperation({
    summary: 'Get the latest market quote for a symbol',
  })
  @ApiParam({
    name: 'symbol',
    example: 'AAPL',
    description: 'Stock ticker symbol',
  })
  async getQuote(
    @Param('symbol') symbol: string,
  ): Promise<MarketQuote> {
    return this.marketDataService.getQuote(symbol);
  }
}