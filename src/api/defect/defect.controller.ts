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
import { DefectService } from './defect.service';
import { CreateDefectDto } from './dto/create-defect.dto';
import { UpdateDefectDto } from './dto/update-defect.dto';

@Controller({
  path: 'defect',
  version: '1',
})
export class DefectController {
  constructor(private readonly defectService: DefectService) {}

  @Post()
  create(@Body() createDefectDto: CreateDefectDto) {
    return this.defectService.create(createDefectDto);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.defectService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefectDto: UpdateDefectDto) {
    return this.defectService.update(+id, updateDefectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defectService.remove(+id);
  }
}
