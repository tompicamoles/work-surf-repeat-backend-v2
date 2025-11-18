import { Country } from './spot.enum';

// Domain Exceptions
export class SpotValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SpotValidationError';
  }
}

interface SpotLikeConstructorParams {
  id: number;
  userId: string;
  spotId: number;
}
export class SpotLike {
  id: number;
  userId: string;
  spotId: number;

  constructor(params: SpotLikeConstructorParams) {
    this.id = params.id;
    this.userId = params.userId;
    this.spotId = params.spotId;
  }
}

export interface SpotConstructorParams {
  id: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  country: Country;
  imageLink: URL;
  hasCoworking: boolean;
  hasColiving: boolean;
  latitude: number;
  longitude: number;
  submittedBy: string;
  wifiQuality: number;
  surfSeason: string;
  lifeCost: number;
  creatorName: string;
  likes?: SpotLike[];
  summary: string;
}

export interface ValidateElegibilityParams {
  isValidatedByAiModeration: boolean;
  name: string;
  country: Country;
}

export class Spot {
  public readonly id: `${string}-${string}-${string}-${string}-${string}`;
  public readonly name: string;
  public readonly country: Country;
  public readonly imageLink: URL;
  public readonly hasCoworking: boolean;
  public readonly hasColiving: boolean;
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly submittedBy: string;
  public readonly wifiQuality: number;
  public readonly continent: string;
  public readonly surfSeason: string;
  public readonly lifeCost: number;
  public readonly creatorName: string;
  public likes: SpotLike[];
  public readonly summary: string;

  constructor(params: SpotConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.country = params.country;
    this.imageLink = params.imageLink;
    this.hasCoworking = params.hasCoworking;
    this.hasColiving = params.hasColiving;
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.submittedBy = params.submittedBy;
    this.wifiQuality = params.wifiQuality;
    this.surfSeason = params.surfSeason;
    this.lifeCost = params.lifeCost;
    this.creatorName = params.creatorName;
    this.likes = params.likes || [];
    this.summary = params.summary;
  }

  static create(params: SpotConstructorParams): Spot {
    // Essential domain invariants only

    // Required fields
    if (!params.name?.trim()) {
      throw new SpotValidationError('Name is required');
    }
    //todo should I implement isValidCountry validation, or since this its type is already defined in the enum, is it enough ?

    if (!params.country) {
      throw new SpotValidationError('Country is required');
    }
    if (!params.imageLink) {
      throw new SpotValidationError('Image link is required');
    }
    if (!params.submittedBy?.trim()) {
      throw new SpotValidationError('Submitted by is required');
    }
    if (!params.creatorName?.trim()) {
      throw new SpotValidationError('Creator name is required');
    }
    if (!params.summary?.trim()) {
      throw new SpotValidationError('Summary is required');
    }
    if (!params.surfSeason?.trim()) {
      throw new SpotValidationError('Surf season is required');
    }
    if (!this.isValidSurfSeason(params.surfSeason)) {
      throw new SpotValidationError('Invalid surf season format');
    }

    // Range validations
    if (params.wifiQuality < 1 || params.wifiQuality > 5) {
      throw new SpotValidationError('WiFi quality must be between 1-5');
    }
    if (params.latitude < -90 || params.latitude > 90) {
      throw new SpotValidationError('Invalid latitude');
    }
    if (params.longitude < -180 || params.longitude > 180) {
      throw new SpotValidationError('Invalid longitude');
    }
    if (params.lifeCost < 1 || params.lifeCost > 5) {
      throw new SpotValidationError('Life cost must be between 1-5');
    }

    return new Spot(params);
  }

  private static isValidSurfSeason(surfSeason: string): boolean {
    const validSeasons = [
      'all year round',
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];

    const normalizedSeason = surfSeason.toLowerCase().trim();

    return validSeasons.some((season) => normalizedSeason.includes(season));
  }

  static validateEligibilityOrThrow(params: ValidateElegibilityParams) {
    if (!params.isValidatedByAiModeration) {
      throw new SpotValidationError(
        `${params.name} in ${params.country} is not suitable for surfing or remote work`,
      );
    }
  }

  static getAiModeratorInstructions(name, country) {
    return `Location inludes the name of the location and the country. 
        Evaluate 'false' if the location does not exist. 
        Evaluate: 'true' if Location is <=20 min drive from ocean/sea AND only if traditional ocean surfing is possible. 
        Else 'false'. 
        Output: respond with 'true' or 'false' only. 
        Location: ${name}, ${country}`;
  }

  // //todo il faut sauvegarder tout l'agrégat à la suite de l'ajout / supression d'un like ?
  // public like(params: SpotLikeConstructorParams): SpotLike | void {
  //   const likeId = params.id;
  //   const isAlreadyExisting = this.likes.some((like) => {
  //     return like.id === likeId;
  //   });

  //   if (isAlreadyExisting) {
  //     this.removeLike(likeId);
  //   } else {
  //     const like = new SpotLike(params);
  //     this.addLike(like);
  //     return like;
  //   }
  // }

  // public get totalLikes(): number {
  //   return this.likes.length;
  // }

  // // todo faut il avoir une seule méthode "like" qui défini si un like existe déjà, puis ajoute ou supprime en fonction ?
  // private addLike(like: SpotLike): void {
  //   this.likes.push(like);
  // }

  // // todo vérifier que le filter est correct et qu'il s'afit de la bonne façon de filtere directement sur l'objet
  // private removeLike(id: number): void {
  //   this.likes.filter((like) => {
  //     return like.id !== id;
  //   });
  // }
}
