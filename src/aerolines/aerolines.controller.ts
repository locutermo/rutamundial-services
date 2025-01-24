import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AerolinesService } from './aerolines.service';
import { CreateAerolineDto } from './dto/create-aeroline.dto';
import { UpdateAerolineDto } from './dto/update-aeroline.dto';

@Controller('aerolines')
export class AerolinesController {
  constructor(private readonly aerolinesService: AerolinesService) {}

  @Post()
  create(@Body() createAerolineDto: CreateAerolineDto) {
    return this.aerolinesService.create(createAerolineDto);
  }

  @HttpCode(205)
  @Get()
  findAll() {
    return this.aerolinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aerolinesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAerolineDto: UpdateAerolineDto) {
    return this.aerolinesService.update(+id, updateAerolineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aerolinesService.remove(+id);
  }
}
