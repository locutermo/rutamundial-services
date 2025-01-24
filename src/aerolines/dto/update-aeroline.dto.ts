import { PartialType } from '@nestjs/mapped-types';
import { CreateAerolineDto } from './create-aeroline.dto';

export class UpdateAerolineDto extends PartialType(CreateAerolineDto) {}
