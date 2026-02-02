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
import { CreateHistoryDto } from './dto/create-history.dto';
import { QueryHistoryDto } from './dto/query-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryService } from './history.service';

@Controller({
  path: 'history',
  version: '1',
})
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Get()
  findAll(@Query() query: QueryHistoryDto) {
    const { date, location, status } = query;
    const mode = 'insensitive';
    const where = {
      ...(date && { date: { equals: date, mode } }),
      ...(location && { location: { contains: location, mode } }),
      ...(status && { status: { equals: status, mode } }),
    };
    if (query?.includes === 'photos')
      return this.historyService.findAll({
        ...query,
        includes: { photos: true },
        where,
      });
    if (query?.includes === 'defects')
      return this.historyService.findAll({
        ...query,
        includes: { defects: true },
        where,
      });
    if (query?.includes === 'all')
      return this.historyService.findAll({
        ...query,
        includes: { photos: true, defects: true },
        where,
      });

    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(+id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(+id);
  }
}
