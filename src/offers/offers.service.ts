import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Operator } from 'src/operators/entities/operator.entity';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { Tour } from 'src/tours/entities/tour.entity';

@Injectable()
export class OffersService {

  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,

    @InjectRepository(Tour)
    private readonly tourRepository: Repository<Tour>,

    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
  ){}


  async create(createOfferDto: CreateOfferDto):Promise<Offer> {
    const { tourId, operatorId, kidPrice, adultPrice, } = createOfferDto

    const tour = await this.tourRepository.findOneBy({id:tourId});
    if(!tour){
      throw new NotFoundException(`Tour con id ${tourId} no encontrado`);
    }

    const operator = await this.operatorRepository.findOneBy({id:operatorId});
    if(!operator){
      throw new NotFoundException(`Operator con id ${operatorId} no encontrado`);
    }
  
    const offer = this.offerRepository.create({
      kidPrice,
      adultPrice,
      tour,
      operator
    });

    return await this.offerRepository.save(offer);

  }

  //Obtener las ofertas incluyendo las relaciones con tour y operador
  async findAll() : Promise<Offer[]> {
    return await this.offerRepository.find({relations:['tour','operator']});
  }

  //Obtener una oferta por id
  async findOne(id: number):Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where:{id},
      relations:['tour','operator']
    }); 

    if(!offer){
      throw new NotFoundException(`Oferta con id ${id} no encontrada`);
    }

    return offer;

  }

  async update(id: number, updateOfferDto: UpdateOfferDto):Promise<Offer> {
    const offer = await this.findOne(id);
    if(updateOfferDto.tourId){
      const tour = await this.tourRepository.findOneBy({id:updateOfferDto.tourId});
      if(!tour){
        throw new NotFoundException(`Tour con id ${updateOfferDto.tourId} no encontrado`);
      }
      offer.tour = tour;
    }

    if(updateOfferDto.operatorId){
      const operator = await this.operatorRepository.findOneBy({id:updateOfferDto.operatorId});
      if(!operator){
        throw new NotFoundException(`Operator con id ${updateOfferDto.operatorId} no encontrado`);
      }
      offer.operator = operator;
    }

    if(updateOfferDto.kidPrice){
      offer.kidPrice = updateOfferDto.kidPrice;
    }

    if(updateOfferDto.adultPrice){
      offer.adultPrice = updateOfferDto.adultPrice;
    }

    return await this.offerRepository.save(offer);


  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
