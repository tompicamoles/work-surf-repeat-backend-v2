import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import type { AuthenticatedRequest } from './guards/auth.guard';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
