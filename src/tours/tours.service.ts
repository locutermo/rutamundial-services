import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,
  ) {}

  async create(createTourDto: CreateTourDto): Promise<Tour> {
    const tour = this.tourRepository.create(createTourDto);
    return this.tourRepository.save(tour);
  }

  findAll(): Promise<Tour[]> {
    return this.tourRepository.find();
  }

  async findOne(id: number): Promise<Tour> {
    const tour = await this.tourRepository.findOne({ where: { id } });
    if (!tour) {
      throw new NotFoundException(`Tour with id ${id} not found`);
    }
    return tour;
  }

  async update(id: number, updateTourDto: UpdateTourDto): Promise<Tour> {
    const tour = await this.findOne(id);
    Object.assign(tour, updateTourDto);
    return this.tourRepository.save(tour);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.tourRepository.delete(id);
  }
}
