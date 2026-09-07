import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import {
  CurrentUser,
  JwtAuthGuard,
} from '../auth';

import type { UserDocument } from '../users';

import { AddWatchlistDto } from './add-watchlist.dto';
import { WatchlistService } from './watchlist.service';

@ApiTags('Watchlists')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('watchlists')
export class WatchlistsController {
  constructor(
    private readonly watchlistService: WatchlistService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Add a stock to the current user watchlist',
  })
  async addStock(
    @CurrentUser() user: UserDocument,
    @Body() body: AddWatchlistDto,
  ) {
    return this.watchlistService.create(
      user._id.toString(),
      body.symbol,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get the current user watchlist',
  })
  async getWatchlist(
    @CurrentUser() user: UserDocument,
  ) {
    return this.watchlistService.findAll(
      user._id.toString(),
    );
  }

  @Delete(':symbol')
  @ApiOperation({
    summary: 'Remove a stock from the current user watchlist',
  })
  @ApiParam({
    name: 'symbol',
    example: 'AAPL',
    description: 'Stock ticker symbol',
  })
  async removeStock(
    @CurrentUser() user: UserDocument,
    @Param('symbol') symbol: string,
  ): Promise<void> {
    return this.watchlistService.remove(
      user._id.toString(),
      symbol,
    );
  }
}