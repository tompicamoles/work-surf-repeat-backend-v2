import { Country } from '../domain/spot.enum';

interface CountryRelatedData {
  lifeCost: number;
  surfSeason: string;
}

interface GeolocationData {
  longitude: number;
  latitude: number;
}

//todo : deplacer chaque port au bon endroit et bien organiser le code afin de pouvoir réutiliser le nécessaire

// application/ports/ai-moderation.port.ts
export interface AiModerationPort {
  validateSpot(name: string, country: Country): Promise<boolean>;
}

// application/ports/geolocation.port.ts
export interface GeolocationPort {
  getCoordinates(location: string, country: Country): Promise<GeolocationData>;
}

// application/ports/country-data.port.ts
export interface CountryDataPort {
  getCountryInfo(country: Country): Promise<CountryRelatedData>;
}

// application/ports/content-generation.port.ts
export interface ContentGenerationPort {
  generateSummary(name: string, country: Country): Promise<string>;
}
