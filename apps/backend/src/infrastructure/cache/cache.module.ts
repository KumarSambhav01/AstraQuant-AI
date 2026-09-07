import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

import { env } from '@astraquant/shared-config';

import { REDIS_CLIENT } from './cache.constants';
import { CacheService } from './cache.service';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: () => {
        return new Redis(env.REDIS_URL, {
          maxRetriesPerRequest: 1,
          enableReadyCheck: true,
        });
      },
    },
    CacheService,
  ],
  exports: [CacheService],
})
export class CacheModule {}