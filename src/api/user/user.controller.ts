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
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: QueryUserDto) {
    const { name, username, document } = query;
    const mode = 'insensitive';
    const where = {
      ...(name && { name: { contains: name, mode } }),
      ...(username && { username: { contains: username, mode } }),
      ...(document && { document: { contains: document, mode } }),
    };
    if (query.includes === 'histories')
      return this.userService.findAll({
        ...query,
        includes: { histories: true },
        where,
      });
    if (query.includes === 'fuelFulls')
      return this.userService.findAll({
        ...query,
        includes: { fuelFulls: true },
        where,
      });
    if (query.includes === 'all')
      return this.userService.findAll({
        ...query,
        includes: { histories: true, fuelFulls: true },
        where,
      });
    return this.userService.findAll({ ...query, includes: {} });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get(':id/fuel')
  findFuelFull(@Param('id') id: number, @Query() query?: QueryUserDto) {
    delete query?.includes;
    return this.userService.findFuelFull(id, query);
  }

  @Get(':id/histories')
  findHistory(@Param('id') id: number, @Query() query?: QueryUserDto) {
    delete query?.includes;
    return this.userService.findHistory(id, query);
  }
}
