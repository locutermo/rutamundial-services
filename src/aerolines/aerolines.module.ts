import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolinesService } from './aerolines.service';
import { AerolinesController } from './aerolines.controller';
import { Aeroline } from './entities/aeroline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aeroline])],
  controllers: [AerolinesController],
  providers: [AerolinesService],
})
export class AerolinesModule {}
