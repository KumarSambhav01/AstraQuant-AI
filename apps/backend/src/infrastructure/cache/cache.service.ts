import { Inject, Injectable, Logger } from '@nestjs/common';
import type Redis from 'ioredis';

import { REDIS_CLIENT } from './cache.constants';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);

      if (!value) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error) {
      this.logger.warn(
        `Redis GET failed for key "${key}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      return null;
    }
  }

  async set<T>(
    key: string,
    value: T,
    ttlSeconds?: number,
  ): Promise<void> {
    try {
      const serialized = JSON.stringify(value);

      if (ttlSeconds !== undefined) {
        await this.redis.set(key, serialized, 'EX', ttlSeconds);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch (error) {
      this.logger.warn(
        `Redis SET failed for key "${key}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      this.logger.warn(
        `Redis DELETE failed for key "${key}": ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async ping(): Promise<boolean> {
    try {
      return (await this.redis.ping()) === 'PONG';
    } catch (error) {
      this.logger.warn(
        `Redis PING failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      return false;
    }
  }
}
