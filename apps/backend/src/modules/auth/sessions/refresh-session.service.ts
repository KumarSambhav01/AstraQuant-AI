import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  RefreshSession,
  RefreshSessionDocument,
} from './refresh-session.schema';

@Injectable()
export class RefreshSessionService {
  constructor(
    @InjectModel(RefreshSession.name)
    private readonly refreshSessionModel: Model<RefreshSessionDocument>,
  ) {}

  async create(
    userId: string,
    jti: string,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<RefreshSessionDocument> {
    return this.refreshSessionModel.create({
      userId: new Types.ObjectId(userId),
      jti,
      tokenHash,
      expiresAt,
      revokedAt: null,
    });
  }

  async findActiveByJti(
    jti: string,
  ): Promise<RefreshSessionDocument | null> {
    return this.refreshSessionModel
      .findOne({
        jti,
        revokedAt: null,
        expiresAt: { $gt: new Date() },
      })
      .exec();
  }

  async revokeByJti(jti: string): Promise<void> {
    await this.refreshSessionModel.updateOne(
      {
        jti,
        revokedAt: null,
      },
      {
        $set: {
          revokedAt: new Date(),
        },
      },
    ).exec();
  }

  async revokeAllForUser(userId: string): Promise<void> {
    await this.refreshSessionModel.updateMany(
      {
        userId: new Types.ObjectId(userId),
        revokedAt: null,
      },
      {
        $set: {
          revokedAt: new Date(),
        },
      },
    ).exec();
  }
}