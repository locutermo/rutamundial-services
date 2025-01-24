// src/aerolines/aerolines.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAerolineDto } from './dto/create-aeroline.dto';
import { UpdateAerolineDto } from './dto/update-aeroline.dto';
import { Aeroline } from './entities/aeroline.entity';

@Injectable()
export class AerolinesService {
  constructor(
    @InjectRepository(Aeroline)
    private readonly aerolineRepo: Repository<Aeroline>,
  ) {}

  async create(createAerolineDto: CreateAerolineDto): Promise<Aeroline> {
    const aeroline = this.aerolineRepo.create(createAerolineDto);
    return this.aerolineRepo.save(aeroline);
  }

  findAll(): Promise<Aeroline[]> {
    return this.aerolineRepo.find();
  }

  findOne(id: number): Promise<Aeroline|null> {
    return this.aerolineRepo.findOne({ where: { id } });
  }

  async update(id: number, updateAerolineDto: UpdateAerolineDto): Promise<Aeroline|null> {
    await this.aerolineRepo.update({ id }, updateAerolineDto);
    return this.aerolineRepo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.aerolineRepo.delete(id);
  }
}
