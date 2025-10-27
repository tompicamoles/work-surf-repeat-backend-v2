import { Test, TestingModule } from '@nestjs/testing';
import { SpotsController } from './spot.controller';
import { SpotsService } from './spot.service';

describe('SpotsController', () => {
  let controller: SpotsController;

  const mockSpotsService = {
    findAll: () => ['BatuKaras'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpotsController],
      providers: [{ provide: SpotsService, useValue: mockSpotsService }],
    }).compile();

    controller = module.get<SpotsController>(SpotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all spot', () => {
      const result = controller.findAll(100);
      expect(result).toEqual(['BatuKaras']);
    });
  });
});
