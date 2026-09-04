import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { randomUUID } from 'crypto';

import { env } from '@astraquant/shared-config';

import { UserService } from '../users';
import { RefreshSessionService } from './sessions';

interface RefreshPayload {
  sub: string;
  jti: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshSessionService: RefreshSessionService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthTokens> {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser =
      await this.userService.existsByEmail(normalizedEmail);

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const user = await this.userService.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    });

    return this.generateTokens(user.id);
  }

  async login(
    email: string,
    password: string,
  ): Promise<AuthTokens> {
    const user = await this.userService.findByEmail(email);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await argon2.verify(
      user.passwordHash,
      password,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateTokens(user.id);
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    let payload: RefreshPayload;

    try {
      payload =
        await this.jwtService.verifyAsync<RefreshPayload>(
          refreshToken,
          {
            secret: env.JWT_REFRESH_SECRET,
          },
        );
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired refresh token',
      );
    }

    if (!payload.sub || !payload.jti) {
      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    const session =
      await this.refreshSessionService.findActiveByJti(
        payload.jti,
      );

    if (!session) {
      throw new UnauthorizedException(
        'Refresh token has been revoked',
      );
    }

    const valid = await argon2.verify(
      session.tokenHash,
      refreshToken,
    );

    if (!valid) {
      await this.refreshSessionService.revokeByJti(
        payload.jti,
      );

      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    const user = await this.userService.findById(payload.sub);

    if (!user || !user.isActive) {
      await this.refreshSessionService.revokeByJti(
        payload.jti,
      );

      throw new UnauthorizedException(
        'Invalid refresh token',
      );
    }

    await this.refreshSessionService.revokeByJti(
      payload.jti,
    );

    return this.generateTokens(user.id);
  }

  async logout(refreshToken: string): Promise<void> {
    let payload: RefreshPayload;

    try {
      payload =
        await this.jwtService.verifyAsync<RefreshPayload>(
          refreshToken,
          {
            secret: env.JWT_REFRESH_SECRET,
          },
        );
    } catch {
      return;
    }

    if (payload.jti) {
      await this.refreshSessionService.revokeByJti(
        payload.jti,
      );
    }
  }

  private async generateTokens(
    userId: string,
  ): Promise<AuthTokens> {
    const jti = randomUUID();

    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: userId,
        jti,
      },
      {
        secret: env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    const tokenHash = await argon2.hash(refreshToken, {
      type: argon2.argon2id,
    });

    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    );

    await this.refreshSessionService.create(
      userId,
      jti,
      tokenHash,
      expiresAt,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
