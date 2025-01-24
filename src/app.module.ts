import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolinesModule } from './aerolines/aerolines.module';
import { Aeroline } from './aerolines/entities/aeroline.entity';
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/datasource';

dotenv.config();

@Module({
  imports: [
    AerolinesModule,
    TypeOrmModule.forRoot(AppDataSource.options),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}