import { Country } from 'src/spot/domain/spot.enum';

export const COUNTRY_DATA_REPOSITORY = Symbol('CONTRY_DATA_REPOSITORY');

export interface CountryData {
  name: Country;
  surfSeason: string;
  lifeCost: number;
}

export interface CountryDataRepository {
  getCountryData(country: Country): Promise<CountryData>;
}
