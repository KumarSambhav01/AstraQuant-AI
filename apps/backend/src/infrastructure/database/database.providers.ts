import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { env } from '@astraquant/shared-config';

import {
  DATABASE_RETRY_ATTEMPTS,
  DATABASE_RETRY_DELAY,
  DATABASE_CONNECTION_TIMEOUT,
  DATABASE_SERVER_SELECTION_TIMEOUT,
} from './database.constants';

export const databaseProviders: MongooseModuleAsyncOptions = {
  useFactory: async () => ({
    uri: env.MONGODB_URI,

    retryAttempts: DATABASE_RETRY_ATTEMPTS,

    retryDelay: DATABASE_RETRY_DELAY,

    serverSelectionTimeoutMS: DATABASE_SERVER_SELECTION_TIMEOUT,

    connectTimeoutMS: DATABASE_CONNECTION_TIMEOUT,

    autoIndex: process.env.NODE_ENV !== 'production',

    maxPoolSize: 20,

    minPoolSize: 5,

    socketTimeoutMS: 45000,
  }),
};