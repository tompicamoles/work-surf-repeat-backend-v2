import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Country } from '../domain/spot.enum';
import { SpotLike } from '../domain/spot.model';

export class CreateSpotDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public country: Country;

  @IsString()
  @IsOptional()
  public imagLink?: string;

  @IsNumber()
  @IsNotEmpty()
  public wifiQuality: number;
}

export class SpotResponseDto {
  id: number;
  name: string;
  country: Country;
  imageLink: string;
  hasCoworking: boolean;
  hasColiving: boolean;
  latitude: number;
  longitude: number;
  submittedBy: string;
  wifiQuality: number;
  surfSeason: string;
  lifeCost: number;
  creatorName: string;
  likes: SpotLike[];
  totalLike: number;
  summary: string;
}
