import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operator } from 'src/operators/entities/operator.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Offer } from './entities/offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Tour, Operator])],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}
