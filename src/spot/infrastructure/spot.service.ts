import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/infrastructure/src/lib/auth/guards/auth.guard';
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

  async create(
    createSpotDto: CreateSpotDto,
    request: AuthenticatedRequest,
  ): Promise<SpotResponseDto> {
    const submittedBy = request.user.sub;
    const creatorName = request.user.user_metadata.full_name;
    const spotData: CreateSpotUseCaseParams = {
      ...createSpotDto,
      creatorName,
      submittedBy,
    };
    const spot = await this.createSpotUsecase.execute(spotData);
    return {
      ...spot,
      imageLink: spot.imageLink.toString(),
      totalLike: spot.likes.length,
    };
  }
}
