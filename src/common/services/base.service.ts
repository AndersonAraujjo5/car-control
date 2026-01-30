import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { QueryDto } from '../dto/query.dto';

export class BaseService<CreateDto, UpdateDto> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelName: keyof PrismaService,
  ) {}

  protected NotFoundException() {
    throw new NotFoundException(`${String(this.modelName)} not found`);
  }

  async create(data: CreateDto) {
    return (this.prisma[this.modelName] as any).create({ data });
  }

  async findAll(queryDto?: QueryDto) {
    const options = {
      skip: Number(queryDto?.offset) || 0,
      take: Number(queryDto?.limit) || 10,
      include: queryDto?.includes,
    };
    const result = await (this.prisma[this.modelName] as any).findMany({
      ...options,
    });

    return {
      data: result,
      total: await (this.prisma[this.modelName] as any).count(),
      offset: options.skip,
      limit: options.take,
    };
  }

  async findOne(id: number) {
    const result = await (this.prisma[this.modelName] as any).findUnique({
      where: { id },
    });

    if (!result) this.NotFoundException();

    return result;
  }

  async update(id: number, data: UpdateDto) {
    const result = await (this.prisma[this.modelName] as any).update({
      where: { id },
      data,
    });

    if (!result) this.NotFoundException();

    return result;
  }

  async remove(id: number) {
    const result = await this.findOne(id);

    if (!result) this.NotFoundException();

    await (this.prisma[this.modelName] as any).delete({
      where: { id },
    });
    return result;
  }
}
