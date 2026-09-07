import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { env } from '@astraquant/shared-config';

import {
  CacheService,
  CACHE_TTL,
} from '../../infrastructure/cache';

export interface MarketQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: number;
}

interface FinnhubQuoteResponse {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

@Injectable()
export class MarketDataService {
  private readonly baseUrl = 'https://finnhub.io/api/v1';

  constructor(
    private readonly cacheService: CacheService,
  ) {}

  async getQuote(symbol: string): Promise<MarketQuote> {
    const normalizedSymbol = symbol.trim().toUpperCase();

    if (
      !normalizedSymbol ||
      !/^[A-Z0-9.-]+$/.test(normalizedSymbol)
    ) {
      throw new NotFoundException('Invalid stock symbol');
    }

    const cacheKey = `market:quote:${normalizedSymbol}`;

    // Check Redis first.
    const cachedQuote =
      await this.cacheService.get<MarketQuote>(cacheKey);

    if (cachedQuote) {
      return cachedQuote;
    }

    // Redis miss — fetch fresh data from Finnhub.
    const url = new URL(`${this.baseUrl}/quote`);
    url.searchParams.set('symbol', normalizedSymbol);
    url.searchParams.set('token', env.FINNHUB_API_KEY);

    let response: Response;

    try {
      response = await fetch(url);
    } catch {
      throw new BadGatewayException(
        'Unable to connect to market data provider',
      );
    }

    if (!response.ok) {
      throw new BadGatewayException(
        'Market data provider request failed',
      );
    }

    let data: FinnhubQuoteResponse;

    try {
      data = (await response.json()) as FinnhubQuoteResponse;
    } catch {
      throw new BadGatewayException(
        'Invalid response from market data provider',
      );
    }

    if (
      typeof data.c !== 'number' ||
      typeof data.t !== 'number'
    ) {
      throw new BadGatewayException(
        'Invalid market data received from provider',
      );
    }

    if (data.c === 0 && data.pc === 0) {
      throw new NotFoundException(
        `No market data found for ${normalizedSymbol}`,
      );
    }

    const quote: MarketQuote = {
      symbol: normalizedSymbol,
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      high: data.h,
      low: data.l,
      open: data.o,
      previousClose: data.pc,
      timestamp: data.t,
    };

    // Cache successful quote for 5 minutes.
    await this.cacheService.set(
      cacheKey,
      quote,
      CACHE_TTL.MARKET_QUOTE,
    );

    return quote;
  }
}