import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { Place } from './entities/place.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Tour } from 'src/tours/entities/tour.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place,Hotel,Tour])],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
