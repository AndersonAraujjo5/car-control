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
import { QueryDto } from 'src/common/dto/query.dto';
import { CreateFuelFullDto } from './dto/create-fuel-full.dto';
import { UpdateFuelFullDto } from './dto/update-fuel-full.dto';
import { FuelFullService } from './fuel-full.service';

@Controller({
  path: 'fuel',
  version: '1',
})
export class FuelFullController {
  constructor(private readonly fuelFullService: FuelFullService) {}

  @Post()
  create(@Body() createFuelFullDto: CreateFuelFullDto) {
    return this.fuelFullService.create(createFuelFullDto);
  }

  @Get()
  findAll(@Query() query?: QueryDto) {
    return this.fuelFullService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelFullService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuelFullDto: UpdateFuelFullDto,
  ) {
    return this.fuelFullService.update(+id, updateFuelFullDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelFullService.remove(+id);
  }
}
