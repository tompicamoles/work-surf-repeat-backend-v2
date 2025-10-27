import { Global, Module } from '@nestjs/common';
import { SPOTS_REPOSITORY } from 'src/spot/application/spot.repository';
import { PostgresSpotRepository } from './repositories/spot.repository';
import { PostgresClientModule } from './postgres-client/postgres-client.module';

@Global()
@Module({
  providers: [
    {
      provide: SPOTS_REPOSITORY,
      useClass: PostgresSpotRepository,
    },
  ],
  exports: [SPOTS_REPOSITORY],
  imports: [PostgresClientModule],
})
export class PostgresRepositoriesModule {}
