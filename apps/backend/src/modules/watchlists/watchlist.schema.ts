import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WatchlistDocument = HydratedDocument<Watchlist>;

@Schema({
  collection: 'watchlists',
  timestamps: true,
})
export class Watchlist {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    index: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    required: true,
    uppercase: true,
    trim: true,
    minlength: 1,
    maxlength: 20,
  })
  symbol!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export const WatchlistSchema =
  SchemaFactory.createForClass(Watchlist);

WatchlistSchema.index(
  { userId: 1, symbol: 1 },
  { unique: true },
);
