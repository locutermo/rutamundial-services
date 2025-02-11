import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Operator } from './entities/operator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OperatorsService {

  constructor(
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
  ){}

  async create(createOperatorDto: CreateOperatorDto):Promise<Operator> {
    const operator = this.operatorRepository.create(createOperatorDto);
    return await this.operatorRepository.save(operator);
  }

  async findAll():Promise<Operator[]> {
    return await this.operatorRepository.find();
  }

  async findOne(id: number) :Promise<Operator> {
    const operator = await this.operatorRepository.findOneBy({id});
    if(!operator){
      throw new NotFoundException(`Operator with id ${id} not found`);
    }
    return operator;

  }

  async update(id: number, updateOperatorDto: UpdateOperatorDto):Promise<Operator> {
    const operator = await this.findOne(id);
    Object.assign(operator, updateOperatorDto);
    return await this.operatorRepository.save(operator);
  }

  async remove(id: number):Promise<void> {
    const operator = await this.findOne(id)
    await this.operatorRepository.delete(operator);
  }
}
