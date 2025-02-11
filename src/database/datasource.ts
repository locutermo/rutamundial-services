import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Aeroline } from 'src/aerolines/entities/aeroline.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Hotel } from 'src/hotels/entities/hotel.entity';
import { Place } from 'src/places/entities/place.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Operator } from 'src/operators/entities/operator.entity';
import { Offer } from 'src/offers/entities/offer.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'locutermo',
  password: process.env.DB_PASSWORD || 'smokdasfdd123',
  database: process.env.DB_DATABASE || 'rutamundial',
  entities: [Aeroline,Client,Hotel,Place,Tour,Operator,Offer],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });