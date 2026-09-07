import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth';
import { JwtAuthGuard } from '../auth/guards';
import { UserModule } from '../users';

import {
  Watchlist,
  WatchlistSchema,
} from './watchlist.schema';

import { WatchlistService } from './watchlist.service';
import { WatchlistsController } from './watchlists.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Watchlist.name,
        schema: WatchlistSchema,
      },
    ]),
  ],
  controllers: [WatchlistsController],
  providers: [WatchlistService, JwtAuthGuard],
  exports: [WatchlistService],
})
export class WatchlistsModule {}