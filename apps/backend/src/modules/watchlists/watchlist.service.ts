import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  Watchlist,
  WatchlistDocument,
} from './watchlist.schema';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist.name)
    private readonly watchlistModel: Model<WatchlistDocument>,
  ) {}

  async create(
    userId: string,
    symbol: string,
  ): Promise<WatchlistDocument> {
    const normalizedSymbol = symbol.trim().toUpperCase();

    try {
      return await this.watchlistModel.create({
        userId: new Types.ObjectId(userId),
        symbol: normalizedSymbol,
      });
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 11000
      ) {
        throw new ConflictException(
          `${normalizedSymbol} is already in your watchlist`,
        );
      }

      throw error;
    }
  }

  async findAll(
    userId: string,
  ): Promise<WatchlistDocument[]> {
    return this.watchlistModel
      .find({
        userId: new Types.ObjectId(userId),
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async remove(
    userId: string,
    symbol: string,
  ): Promise<void> {
    const normalizedSymbol = symbol.trim().toUpperCase();

    const result = await this.watchlistModel
      .deleteOne({
        userId: new Types.ObjectId(userId),
        symbol: normalizedSymbol,
      })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `${normalizedSymbol} is not in your watchlist`,
      );
    }
  }
}
