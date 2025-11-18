import { Spot } from '../../../../spot/domain/spot.model';

export const SPOT_REPOSITORY = Symbol('SPOT_REPOSITORY');

export interface SpotRepository {
  // findAll(): Promise<Spot[]>;
  // findById(id: number): Promise<Spot | undefined>;
  // findByIdOrThrow(id: number): Promise<Spot>;
  create(spot: Spot): Promise<void>;
  //delete(spot: Spot): Promise<void>;
}
