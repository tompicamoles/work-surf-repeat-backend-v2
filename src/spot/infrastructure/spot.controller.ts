import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSpotDto, SpotResponseDto } from './spot.dto';
import { SpotsService } from './spot.service';

import { HttpException, HttpStatus, Param } from '@nestjs/common';
@Controller('spot')
export class SpotsController {
  constructor(private spotService: SpotsService) {}
  @Get()
  findAll(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ) {
    return this.spotService.findAll(limit);
  }

  @Get()
  findOne(@Param('id', ParseIntPipe) id: number) {
    const spot = this.spotService.findOne(id);

    if (spot) {
      throw new HttpException('no spot found', HttpStatus.NOT_FOUND);
    }
    return spot;
  }

  @Post('create')
  create(@Body(ValidationPipe) input: CreateSpotDto): Promise<SpotResponseDto> {
    return this.spotService.create(input);
  }
}
