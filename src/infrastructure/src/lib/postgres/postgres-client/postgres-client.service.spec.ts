import { Test, TestingModule } from '@nestjs/testing';
import { PostgresClientService } from './postgres-client.service';

describe('PostgresClientService', () => {
  let service: PostgresClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresClientService],
    }).compile();

    service = module.get<PostgresClientService>(PostgresClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
