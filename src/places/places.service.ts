import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Hotel } from 'src/hotels/entities/hotel.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,

    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,

  ) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const place = this.placeRepository.create(createPlaceDto);
    return this.placeRepository.save(place);
  }

  async assignHotelToPlace(placeId: number, hotelId: number): Promise<Place> {
    const place = await this.findOne(placeId);

    const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
    if (!hotel) {
      throw new NotFoundException(`Hotel con id ${hotelId} no encontrado`);
    }

    if (!place.hotels) {
      place.hotels = [];
    }

    const alreadyAssigned = place.hotels.find((h) => h.id === hotel.id);
    if (!alreadyAssigned) {
      place.hotels.push(hotel);
    }

    return await this.placeRepository.save(place);
  }

  findAll(): Promise<Place[]> {
    return this.placeRepository.find();
  }

  async findAllWithHotels(): Promise<Place[]> {
    return await this.placeRepository.find({ relations: ['hotels'] });
  }

  async findOne(id: number): Promise<Place> {
    const place = await this.placeRepository.findOne({ where: { id }, relations: ['hotels'] });
    if (!place) {
      throw new NotFoundException(`Place with id ${id} not found`);
    }
    return place;
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.findOne(id);
    Object.assign(place, updatePlaceDto);
    return this.placeRepository.save(place);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.placeRepository.delete(id);
  }
}
