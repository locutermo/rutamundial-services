import { Test, TestingModule } from '@nestjs/testing';
import { AerolinesController } from './aerolines.controller';
import { AerolinesService } from './aerolines.service';

describe('AerolinesController', () => {
  let controller: AerolinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AerolinesController],
      providers: [AerolinesService],
    }).compile();

    controller = module.get<AerolinesController>(AerolinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
