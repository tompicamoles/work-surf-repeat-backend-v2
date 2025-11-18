import { Injectable } from '@nestjs/common';
import {
  CountryData,
  CountryDataRepository,
} from 'src/application/src/lib/repositories/country-data.repository';
import { Country } from 'src/spot/domain/spot.enum';

@Injectable()
export class PostgresCountryRepository implements CountryDataRepository {
  //constructor(private readonly client: PostgresClient) {} // todo should I import it here ?

  // todo implement SQL call
  async getCountryData(country: Country): Promise<CountryData> {
    await Promise.resolve();
    return {
      name: country,
      surfSeason: '1, 2',
      lifeCost: 2,
    };
  }
}
