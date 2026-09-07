import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import {
  MarketQuote,
} from '../market-data';

import { StocksService } from './stocks.service';

@ApiTags('Stocks')
@Controller('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
  ) {}

  @Get(':symbol')
  @ApiOperation({
    summary: 'Get stock information for a symbol',
  })
  @ApiParam({
    name: 'symbol',
    example: 'AAPL',
    description: 'Stock ticker symbol',
  })
  async getStock(
    @Param('symbol') symbol: string,
  ): Promise<MarketQuote> {
    return this.stocksService.getStock(symbol);
  }
}