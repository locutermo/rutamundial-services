import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTourDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  kidPrice?: number;

  @IsNumber()
  @IsOptional()
  adultPrice?: number;
}
