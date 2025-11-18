import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/src/lib/auth/auth.module';
import { GeminiModule } from './infrastructure/src/lib/gemini/gemini.module';
import { PostgresRepositoriesModule } from './infrastructure/src/lib/postgres/postgres-repositories.module';
import { UnsplashModule } from './infrastructure/src/lib/unsplash/unsplash.module';
import { SpotsModule } from './spot/infrastructure/spot.module';
import { WorkSpacesModule } from './work-space/work-spaces.module';

@Module({
  imports: [
    SpotsModule,
    WorkSpacesModule,
    ConfigModule,
    PostgresRepositoriesModule,
    UnsplashModule,
    GeminiModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
