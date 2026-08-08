import { Module } from '@nestjs/common';

import { LoggerModule } from './common/logger';
import { DatabaseModule } from './infrastructure/database';
import { HealthModule } from './modules/health';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}