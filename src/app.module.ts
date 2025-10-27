import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { PostgresRepositoriesModule } from './infrastructure/src/lib/postgres/postgres-repositories.module';
import { UnsplashModule } from './infrastructure/src/lib/unsplash/unsplash/unsplash.module';
import { SpotsModule } from './spot/infrastructure/spot.module';
import { WorkSpacesModule } from './work-space/work-spaces.module';

@Module({
  imports: [
    SpotsModule,
    WorkSpacesModule,
    ConfigModule,
    PostgresRepositoriesModule,
    UnsplashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
