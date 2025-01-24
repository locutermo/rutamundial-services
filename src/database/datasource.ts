import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Aeroline } from 'src/aerolines/entities/aeroline.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'locutermo',
  password: process.env.DB_PASSWORD || 'smokdasfdd123',
  database: process.env.DB_DATABASE || 'rutamundial',
  entities: [Aeroline],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });