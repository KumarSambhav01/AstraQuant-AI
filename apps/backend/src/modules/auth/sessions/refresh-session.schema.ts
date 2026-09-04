import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RefreshSessionDocument =
  HydratedDocument<RefreshSession>;

@Schema({
  collection: 'refresh_sessions',
  timestamps: true,
})
export class RefreshSession {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    index: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  jti!: string;

  @Prop({
    required: true,
  })
  tokenHash!: string;

  @Prop({
    required: true,
    index: true,
  })
  expiresAt!: Date;

  @Prop({
    type: Date,
    default: null,
  })
  revokedAt!: Date | null;

  createdAt!: Date;
  updatedAt!: Date;
}

export const RefreshSessionSchema =
  SchemaFactory.createForClass(RefreshSession);
