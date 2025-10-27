import { Inject, Injectable } from '@nestjs/common';
import {
  GEMINI_PROVIDER,
  type GeminiProvider,
} from 'src/application/src/lib/gemini/gemini.provider';
import {
  UNSPLASH_PROVIDER,
  type UnsplashProvider,
} from 'src/application/src/lib/unsplash/unsplash.provider';
import { Country } from '../domain/spot.enum';
import { Spot, SpotConstructorParams } from '../domain/spot.model';
import type {
  ContentGenerationPort,
  CountryDataPort,
  GeolocationPort,
} from './ports';
import type { SpotsRepository } from './spot.repository';
import { SPOTS_REPOSITORY } from './spot.repository';

export interface CreateSpotUseCaseParams {
  name: string;
  country: Country;
  imageLink?: string;
  wifiQuality: number;
  creatorName: string;
  submittedBy: string;
}

@Injectable()
export class CreateSpotUseCase {
  constructor(
    @Inject(SPOTS_REPOSITORY)
    private readonly spotRepository: SpotsRepository,
    @Inject(GEMINI_PROVIDER)
    private readonly aiModeration: GeminiProvider,
    @Inject('GEOLOCATION_PORT')
    private readonly geolocation: GeolocationPort,
    @Inject(UNSPLASH_PROVIDER)
    private readonly imageService: UnsplashProvider,
    @Inject('COUNTRY_DATA_PORT')
    private readonly countryData: CountryDataPort,
    @Inject('CONTENT_GENERATION_PORT')
    private readonly contentGeneration: ContentGenerationPort,
  ) {}

  async execute(params: CreateSpotUseCaseParams): Promise<Spot> {
    const { name, country, wifiQuality, creatorName, submittedBy } = params;

    const isValidatedByAiModeration =
      await this.aiModeration.validateSpotEligibility(name, country);

    // the AI validation is hapenning first here before calling the other External APIs
    Spot.validateEligibilityOrThrow({
      name,
      country,
      isValidatedByAiModeration,
    });

    const id = 1242525; //todo

    const [summary, countryInfo, coordinates] = await Promise.all([
      this.contentGeneration.generateSummary(name, country),
      this.countryData.getCountryInfo(country),
      this.geolocation.getCoordinates(name, country),
    ]);

    const imageLink =
      params.imageLink !== undefined
        ? new URL(params.imageLink)
        : await this.imageService.generateRandomImage('surf');

    const spotData: SpotConstructorParams = {
      id,
      name,
      country,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      imageLink,
      hasColiving: false,
      hasCoworking: false,
      wifiQuality,
      summary,
      surfSeason: countryInfo.surfSeason,
      lifeCost: countryInfo.lifeCost,
      creatorName,
      submittedBy,
    };
    const spot = Spot.create(spotData);
    await this.spotRepository.create(spot);
    return spot;
  }
}
