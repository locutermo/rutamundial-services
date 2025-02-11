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
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

//Omite el rate limiting a todas las rutas del controllador
@SkipThrottle()
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}
  
  //Aplica el rate limiting a la ruta create con un limite de 5 llamadas por 30 segundos
  @Throttle({ default: { limit: 5, ttl: 30000 } })
  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  //Aplica el rate limiting a la ruta findAll
  @SkipThrottle({ default: false })
  @Get()
  async findAll(@Query('withOffers') withOffers: string) {
    const loadOffers = withOffers === 'true';
    return await this.toursService.findAll(loadOffers);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @Get(':id/operators')
  async getOperators(@Param('id') id: string) {
    return await this.toursService.getOperators(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
