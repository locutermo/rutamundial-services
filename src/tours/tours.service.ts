import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from './entities/tour.entity';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Operator } from 'src/operators/entities/operator.entity';

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

  async findAll(withOffers: boolean = false): Promise<Tour[]> {
    if (withOffers) {
      return await this.tourRepository.find({
        relations: ['offers', 'offers.operator'],
      });
    } else {
      return await this.tourRepository.find();
    }
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

  async getOperators(tourId: number): Promise<Operator[]> {
    // Buscamos el tour y cargamos la relación "offers" y la relación anidada "offers.operator"
    const tour = await this.tourRepository.findOne({
      where: { id: tourId },
      relations: ['offers', 'offers.operator'],
    });

    if (!tour) {
      throw new NotFoundException(`Tour con id ${tourId} no encontrado`);
    }

    // Extraemos todos los operadores a partir de las ofertas asociadas al tour
    const operators = tour.offers.map((offer) => offer.operator);

    // Filtramos para obtener solo operadores únicos (en caso de que se repitan)
    const uniqueOperators = operators.filter(
      (operator, index, self) =>
        index === self.findIndex((op) => op.id === operator.id),
    );

    return uniqueOperators;
  }
}
