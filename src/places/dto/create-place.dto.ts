import { IsString, IsOptional } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  country?: string;
}
