import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolinesModule } from './aerolines/aerolines.module';
import { Aeroline } from './aerolines/entities/aeroline.entity';
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/datasource';
import { ClientsModule } from './clients/clients.module';
import { PlacesModule } from './places/places.module';
import { HotelsModule } from './hotels/hotels.module';
import { ToursModule } from './tours/tours.module';
import { ReservationsModule } from './reservations/reservations.module';

dotenv.config();

@Module({
  imports: [
    AerolinesModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    ClientsModule,
    PlacesModule,
    HotelsModule,
    ToursModule,
    ReservationsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}