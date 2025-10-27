import { Spot } from '../domain/spot.model';

export const SPOTS_REPOSITORY = Symbol('SPOTS_REPOSITORY');

export interface SpotsRepository {
  // findAll(): Promise<Spot[]>;
  // findById(id: number): Promise<Spot | undefined>;
  // findByIdOrThrow(id: number): Promise<Spot>;
  create(spot: Spot): Promise<void>;
  //delete(spot: Spot): Promise<void>;
}
