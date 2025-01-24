import { Test, TestingModule } from '@nestjs/testing';
import { AerolinesService } from './aerolines.service';

describe('AerolinesService', () => {
  let service: AerolinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AerolinesService],
    }).compile();

    service = module.get<AerolinesService>(AerolinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
