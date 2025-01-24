import { IsInt, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsOptional()
  adults?: number;

  @IsInt()
  @IsOptional()
  kids?: number;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsInt()
  @IsOptional()
  days?: number;

  @IsInt()
  @IsOptional()
  feeAdults?: number;

  @IsInt()
  @IsOptional()
  feeKids?: number;

  @IsOptional()
  relocation?: any;

  @IsOptional()
  tours?: any;

  @IsString()
  @IsOptional()
  status?: string;
}
