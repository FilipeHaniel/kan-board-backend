import { Injectable } from '@nestjs/common'
import { CreateDivisionDto } from './dto/create-division.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class DivisionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDivisionDto) {
    return this.prisma.division.create({
      data: {
        name: dto.name,
        subject: {
          connect: {
            id: dto.subjectId,
          },
        },
      },
    })
  }

  async findAll() {
    return this.prisma.division.findMany()
  }

  async findOne(id: string) {
    return this.prisma.division.findUnique({
      where: { id },
    })
  }

  async remove(id: string) {
    return this.prisma.division.delete({
      where: { id },
    })
  }
}
