import { Test, TestingModule } from '@nestjs/testing';
import { UniverseController } from './universe.controller';

describe('UniverseController', () => {
  let controller: UniverseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniverseController],
    }).compile();

    controller = module.get<UniverseController>(UniverseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
