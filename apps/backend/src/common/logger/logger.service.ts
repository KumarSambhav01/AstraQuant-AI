import { Injectable, LoggerService } from '@nestjs/common';
import { ILogger } from './logger.interface';

@Injectable()
export class AppLoggerService implements LoggerService, ILogger {
  private format(level: string, message: string, context?: string) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      context: context ?? 'Application',
      message,
    });
  }

  log(message: string, context?: string): void {
    console.log(this.format('INFO', message, context));
  }

  error(message: string, trace?: string, context?: string): void {
    console.error(
      this.format('ERROR', message, context),
      trace ?? '',
    );
  }

  warn(message: string, context?: string): void {
    console.warn(this.format('WARN', message, context));
  }

  debug(message: string, context?: string): void {
    console.debug(this.format('DEBUG', message, context));
  }

  verbose(message: string, context?: string): void {
    console.info(this.format('VERBOSE', message, context));
  }
}