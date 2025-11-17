import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SUPABASE_JWT_SECRET,
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
