import { Module } from '@nestjs/common';

import { LoggerModule } from './common/logger';
import { DatabaseModule } from './infrastructure/database';
import { HealthModule } from './modules/health';
import { AuthModule } from './modules/auth';
import { UserModule } from './modules/users';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    HealthModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}