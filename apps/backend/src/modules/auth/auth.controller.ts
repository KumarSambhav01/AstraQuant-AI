import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators';
import { JwtAuthGuard } from './guards';
import type { UserDocument } from '../users';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

class RefreshTokenDto {
  @IsString()
  @MinLength(1)
  refreshToken!: string;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.name,
      dto.email,
      dto.password,
    );
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(
      dto.email,
      dto.password,
    );
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('logout')
  async logout(@Body() dto: RefreshTokenDto) {
    await this.authService.logout(dto.refreshToken);

    return {
      message: 'Logged out successfully',
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  getCurrentUser(@CurrentUser() user: UserDocument) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}