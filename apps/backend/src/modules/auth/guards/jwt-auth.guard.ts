import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

import { UserService } from '../../users';
import type { UserDocument } from '../../users';

interface JwtPayload {
  sub: string;
}

type AuthenticatedRequest = Request & {
  user: UserDocument;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest<AuthenticatedRequest>();

    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authentication required');
    }

    const token = authorization.substring(7).trim();

    if (!token) {
      throw new UnauthorizedException('Authentication required');
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(token, {
          secret: process.env.JWT_ACCESS_SECRET,
        });

      if (!payload.sub) {
        throw new UnauthorizedException('Invalid access token');
      }

      const user = await this.userService.findById(payload.sub);

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid access token');
      }

      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired access token',
      );
    }
  }
}