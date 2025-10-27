import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateSpotUseCase,
  CreateSpotUseCaseParams,
} from '../application/create-spot.use-case';
import { CreateSpotDto, SpotResponseDto } from './spot.dto';
@Injectable()
export class SpotsService {
  constructor(private readonly createSpotUsecase: CreateSpotUseCase) {}
  spot = 'lol';

  findAll(limit: number) {
    //todo
    if (!this.spot) {
      throw new HttpException('no spot found', HttpStatus.NOT_FOUND);
    }
    console.log(limit);
    return this.spot;
  }

  findOne(id: number) {
    //todo
    const spot = this.spot[id];
    return spot;
  }

  async create(createSpotDto: CreateSpotDto): Promise<SpotResponseDto> {
    //todo implement authentification to get userID and userName from token
    const submittedBy = 123;
    const creatorName = 'lol';
    const spotData: CreateSpotUseCaseParams = {
      ...createSpotDto,
      creatorName,
      submittedBy,
    };
    const spot = await this.createSpotUsecase.execute(spotData);
    return { ...spot, totalLike: spot.totalLikes };
  }
}
