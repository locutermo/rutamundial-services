import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolinesModule } from './aerolines/aerolines.module';
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/datasource';
import { ClientsModule } from './clients/clients.module';
import { PlacesModule } from './places/places.module';
import { HotelsModule } from './hotels/hotels.module';
import { ToursModule } from './tours/tours.module';
import { OperatorsModule } from './operators/operators.module';
import { OffersModule } from './offers/offers.module';

dotenv.config();

@Module({
  imports: [
    AerolinesModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    ClientsModule,
    PlacesModule,
    HotelsModule,
    ToursModule,
    OperatorsModule,
    OffersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}