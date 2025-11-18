import { Country } from 'src/spot/domain/spot.enum';

interface GeolocationData {
  longitude: number;
  latitude: number;
}

export const GEOLOCATION_PROVIDER = Symbol('GEOLOCATION_PROVIDER');

export interface GeolocationProvider {
  getGeolocation(name: string, country: Country): Promise<GeolocationData>;
}
