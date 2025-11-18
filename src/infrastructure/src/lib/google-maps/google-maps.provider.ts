import { Injectable } from '@nestjs/common';
import { GeolocationProvider } from 'src/application/src/lib/providers/geolocationProvider/geolocation.provider';

import { Client } from '@googlemaps/google-maps-services-js';

@Injectable()
export class GoogleMapsProvider implements GeolocationProvider {
  private client = new Client({});
  private apiKey = process.env.GOOGLE_MAPS_API_BACKEND;

  constructor() {
    if (!this.apiKey) {
      throw new Error('GOOGLE_MAPS_API environment variable is not set');
    }
  }

  async getGeolocation(name: string, country: string) {
    try {
      const response = await this.client.geocode({
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
      throw new Error('Fetching geolocation failed:');
    }
  }
}
