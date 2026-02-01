import { PartialType } from '@nestjs/mapped-types';
import { CreateFuelFullDto } from './create-fuel-full.dto';

export class UpdateFuelFullDto extends PartialType(CreateFuelFullDto) {}
