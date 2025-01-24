import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';;
import { CreateAerolineDto } from './dto/create-aeroline.dto';
import { UpdateAerolineDto } from './dto/update-aeroline.dto';
import { Aeroline } from './entities/aeroline.entity';

@Injectable()
export class AerolinesService {
  constructor(
    @InjectRepository(Aeroline)
    private readonly aerolinesRepository: Repository<Aeroline>,
  ) {}

  async create(createAerolineDto: CreateAerolineDto): Promise<Aeroline> {
    const aeroline = this.aerolinesRepository.create(createAerolineDto);
    return this.aerolinesRepository.save(aeroline);
  }

  async findAll(): Promise<Aeroline[]> {
    return this.aerolinesRepository.find();
  }

  async findOne(id: number): Promise<Aeroline> {
    const aeroline = await this.aerolinesRepository.findOne({ where: { id } });
    if (!aeroline) {
      throw new NotFoundException(`Aeroline with ID ${id} not found`);
    }
    return aeroline;
  }

  async update(id: number, updateAerolineDto: UpdateAerolineDto): Promise<Aeroline> {
    const aeroline = await this.findOne(id);
    Object.assign(aeroline, updateAerolineDto);
    return this.aerolinesRepository.save(aeroline);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.aerolinesRepository.delete(id);
  }
}
