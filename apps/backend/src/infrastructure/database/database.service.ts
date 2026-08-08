import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { AppLoggerService } from '../../common/logger';
import { DatabaseHealth } from './database.interfaces';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly logger: AppLoggerService,
  ) {}

  getHealth(): DatabaseHealth {
    return {
      connected: this.connection.readyState === 1,
      readyState: this.connection.readyState,
      database: this.connection.name,
      host: this.connection.host,
      port: this.connection.port,
    };
  }

  isConnected(): boolean {
    return this.connection.readyState === 1;
  }

  logConnectionStatus(): void {
    if (this.isConnected()) {
      this.logger.log(
        `MongoDB connected (${this.connection.name})`,
        'DatabaseService',
      );
    } else {
      this.logger.warn(
        'MongoDB is not connected',
        'DatabaseService',
      );
    }
  }
}