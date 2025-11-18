import { Inject, Injectable } from '@nestjs/common';
import {
  AI_PROVIDER,
  type AiProvider,
} from 'src/application/src/lib/providers/aiProvider/ai.provider';
import { type GeolocationProvider } from 'src/application/src/lib/providers/geolocationProvider/geolocation.provider';
import {
  IMAGE_GENERATOR_PROVIDER,
  type ImageGeneratorProvider,
} from 'src/application/src/lib/providers/imageGenerator/imageGenerator.provider';
import { Country } from '../domain/spot.enum';
import { Spot, SpotConstructorParams } from '../domain/spot.model';
import type { CountryDataPort } from './ports';
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
    @Inject(AI_PROVIDER)
    private readonly aiProvider: AiProvider,
    @Inject('GEOLOCATION_PROVIDER')
    private readonly geolocation: GeolocationProvider,
    @Inject(IMAGE_GENERATOR_PROVIDER)
    private readonly imageService: ImageGeneratorProvider,
    @Inject('COUNTRY_DATA_PORT')
    private readonly countryData: CountryDataPort,
  ) {}

  async execute(params: CreateSpotUseCaseParams): Promise<Spot> {
    const { name, country, wifiQuality, creatorName, submittedBy } = params;

    const isValidatedByAiModeration =
      await this.aiProvider.validateSpotEligibility(name, country);

    // the AI validation is hapenning first here before calling the other External APIs
    Spot.validateEligibilityOrThrow({
      name,
      country,
      isValidatedByAiModeration,
    });

    const uuid = crypto.randomUUID();

    const [summary, countryInfo, coordinates] = await Promise.all([
      this.aiProvider.generateSpotSummary(name, country),
      this.countryData.getCountryInfo(country),
      this.geolocation.getGeolocation(name, country),
    ]);

    const imageLink =
      params.imageLink !== undefined
        ? new URL(params.imageLink)
        : await this.imageService.generateRandomImage('surf');

    const spotData: SpotConstructorParams = {
      id: uuid,
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
