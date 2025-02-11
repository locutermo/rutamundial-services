import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Post(':placeId/hotels/:hotelId')
  async assignHotel(
    @Param('placeId') placeId: string,
    @Param('hotelId') hotelId: string,
  ) {
    return await this.placesService.assignHotelToPlace(
      Number(placeId),
      Number(hotelId),
    );
  }

  @Post(':placeId/tours/:tourId')
  async assignTour(
    @Param('placeId') placeId: string,
    @Param('tourId') tourId: string,
  ) {
    return await this.placesService.assignTourToPlace(
      Number(placeId),
      Number(tourId),
    );
  }

  @Get()
  async findAll(
    @Query('withHotels') withHotels: string,
    @Query('withTours') withTours: string,
  ) {
    const loadHotels = withHotels === 'true';
    const loadTours = withTours === 'true';
    return await this.placesService.findAll(loadHotels, loadTours);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(+id, updatePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placesService.remove(+id);
  }
}
