import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolinesModule } from './aerolines/aerolines.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();


@Module({
  imports: [
    AerolinesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST||'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432 ,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}