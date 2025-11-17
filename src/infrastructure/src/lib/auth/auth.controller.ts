import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthenticatedRequest } from './guards/auth.guard';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
