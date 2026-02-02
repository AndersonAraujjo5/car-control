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
    const { offset = 0, limit = 10, orderBy = 'desc' } = { ...queryDto };
    const options = {
      skip: offset > 0 ? offset * limit : 0,
      take: +limit,
      include: (queryDto as any)?.includes,
      orderBy: {
        id: orderBy,
      },
      where: (queryDto as any)?.where,
    };
    const result = await (this.prisma[this.modelName] as any).findMany({
      ...options,
    });

    return {
      data: result,
      total: await (this.prisma[this.modelName] as any).count(),
      offset: options.skip,
      limit: options.take,
      show: result.length,
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

    await (this.prisma[this.modelName] as any).deleteMany({
      where: {
        id,
      },
    });
    return result;
  }
}
