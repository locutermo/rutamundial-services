import { PartialType } from '@nestjs/mapped-types';
import { CreateAerolineDto } from './create-aeroline.dto';
//when we use PartialType, all properties from CreateAerolineDto become optional in this Dto
export class UpdateAerolineDto extends PartialType(CreateAerolineDto) {}
