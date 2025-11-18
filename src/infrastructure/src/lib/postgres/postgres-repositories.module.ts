import { Global, Module } from '@nestjs/common';
import { COUNTRY_DATA_REPOSITORY } from 'src/application/src/lib/repositories/country-data.repository';
import { SPOT_REPOSITORY } from 'src/application/src/lib/repositories/spot.repository';
import { PostgresClientModule } from './postgres-client/postgres-client.module';
import { PostgresSpotRepository } from './repositories/spot.repository';
import { PostgresCountryRepository } from './repositories/country.repository';

@Global()
@Module({
  providers: [
    {
      provide: SPOT_REPOSITORY,
      useClass: PostgresSpotRepository,
    },
    {
      provide: COUNTRY_DATA_REPOSITORY,
      useClass: PostgresCountryRepository,
    },
  ],
  exports: [SPOT_REPOSITORY, COUNTRY_DATA_REPOSITORY],
  imports: [PostgresClientModule],
})
export class PostgresRepositoriesModule {}
