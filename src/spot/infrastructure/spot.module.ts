import { Module } from '@nestjs/common';
import { CreateSpotUseCase } from '../application/create-spot.use-case';
import { SpotsController } from './spot.controller';
import { SpotsService } from './spot.service';
@Module({
  controllers: [SpotsController],
  providers: [SpotsService, CreateSpotUseCase],
})
export class SpotsModule {}
