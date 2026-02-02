import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller({
  version: '1',
  path: 'car',
})
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  findAll(@Query() query: QueryCarDto) {
    const { plate, model, document } = query;
    const mode = 'insensitive';
    const where = {
      ...(plate && { plate: { contains: plate, mode } }),
      ...(model && { model: { contains: model, mode } }),
      ...(document && { document: { contains: document, mode } }),
    };
    if (query.includes === 'histories')
      return this.carService.findAll({
        ...query,
        includes: { histories: true },
        where,
      });

    if (query.includes === 'fuelFulls')
      return this.carService.findAll({
        ...query,
        includes: { fuelFulls: true },
        where,
      });

    if (query.includes === 'all')
      return this.carService.findAll({
        ...query,
        includes: { histories: true, fuelFulls: true },
        where,
      });

    return this.carService.findAll({ ...query, where, includes: {} });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }

  @Get(':id/histories')
  findHistory(@Param('id') id: number, @Query() query?: QueryCarDto) {
    delete query?.includes;
    return this.carService.findHistory(+id, query);
  }

  @Get(':id/fuel')
  findFuelFull(@Param('id') id: number, @Query() query?: QueryCarDto) {
    delete query?.includes;
    return this.carService.findFuelFull(+id, query);
  }
}
