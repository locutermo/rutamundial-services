import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAerolineDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
