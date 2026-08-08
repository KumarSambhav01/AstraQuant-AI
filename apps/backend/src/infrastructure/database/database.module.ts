import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from '@astraquant/shared-config';

import { AppLoggerService } from '../../common/logger';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: env.MONGODB_URI,

        maxPoolSize: 20,
        minPoolSize: 5,

        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,

        autoIndex: env.NODE_ENV !== 'production',
      }),
    }),
  ],

  providers: [
    DatabaseService,
    AppLoggerService,
  ],

  exports: [
    DatabaseService,
    MongooseModule,
  ],
})
export class DatabaseModule {}