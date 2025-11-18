import { Module } from '@nestjs/common';
import { GeminiModule } from 'src/infrastructure/src/lib/gemini/gemini.module';
import { GoogleMapsModule } from 'src/infrastructure/src/lib/google-maps/google-maps.module';
import { PostgresRepositoriesModule } from 'src/infrastructure/src/lib/postgres/postgres-repositories.module';
import { UnsplashModule } from 'src/infrastructure/src/lib/unsplash/unsplash.module';
import { CreateSpotUseCase } from '../../application/src/spot/create-spot.use-case';
import { SpotsController } from './spot.controller';
import { SpotsService } from './spot.service';
@Module({
  imports: [
    PostgresRepositoriesModule,
    GeminiModule,
    GoogleMapsModule,
    UnsplashModule,
  ],
  controllers: [SpotsController],
  providers: [SpotsService, CreateSpotUseCase],
})
export class SpotsModule {}
