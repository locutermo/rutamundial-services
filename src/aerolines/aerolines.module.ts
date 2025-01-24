import { Module } from '@nestjs/common';
import { AerolinesService } from './aerolines.service';
import { AerolinesController } from './aerolines.controller';

@Module({
  controllers: [AerolinesController],
  providers: [AerolinesService],
})
export class AerolinesModule {}
