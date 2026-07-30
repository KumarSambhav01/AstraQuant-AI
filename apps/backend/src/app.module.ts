import { Module } from '@nestjs/common';
import { LoggerModule } from './common/logger';

@Module({
  imports: [LoggerModule],
})
export class AppModule {}