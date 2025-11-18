import { Injectable } from '@nestjs/common';
import { GeolocationProvider } from 'src/application/src/lib/providers/geolocationProvider/geolocation.provider';

import { Client, GeocodeResponse } from '@googlemaps/google-maps-services-js';

@Injectable()
export class GoogleMapsProvider implements GeolocationProvider {
  private readonly client: Client;
  private readonly apiKey: string;

  constructor() {
    const apiKey = process.env.GOOGLE_MAPS_API_BACKEND;
    if (!apiKey) {
      throw new Error('GOOGLE_MAPS_API environment variable is not set');
    }
    this.apiKey = apiKey;
    this.client = new Client({});
  }

  async getGeolocation(name: string, country: string) {
    try {
      const response: GeocodeResponse = await this.client.geocode({
        params: {
          address: `${name},${country}`,
          key: this.apiKey,
        },
      });

      if (!response.data.results || response.data.results.length === 0) {
        throw new Error(`No geolocation results found for ${name}, ${country}`);
      }

      const geolocation = {
        latitude: response.data.results[0].geometry.location.lat,
        longitude: response.data.results[0].geometry.location.lng,
      };

      return geolocation;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Fetching geolocation failed');
    }
  }
}
