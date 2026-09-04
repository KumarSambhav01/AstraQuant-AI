import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../users';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  RefreshSession,
  RefreshSessionSchema,
  RefreshSessionService,
} from './sessions';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: RefreshSession.name,
        schema: RefreshSessionSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshSessionService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}