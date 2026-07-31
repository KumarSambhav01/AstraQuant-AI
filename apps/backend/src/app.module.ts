import { Module } from '@nestjs/common';
import { LoggerModule } from './common/logger';
import { HealthModule } from './modules/health';

@Module({
  imports: [
    LoggerModule,
    HealthModule,
  ],
})
export class AppModule {}