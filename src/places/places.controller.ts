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
    return await this.placesService.assignHotelToPlace(Number(placeId), Number(hotelId));
  }

  @Get()
  async findAll(@Query('withHotels') withHotels: string) {
    if (withHotels === 'true') {
      return await this.placesService.findAllWithHotels();
    }
    return await this.placesService.findAll();
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
