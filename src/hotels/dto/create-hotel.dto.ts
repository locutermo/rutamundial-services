import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  stars?: number;
}
