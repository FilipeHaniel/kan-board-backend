import { Injectable } from '@nestjs/common'
import { CreateDivisionDto } from './dto/create-division.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class DivisionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateDivisionDto) {
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

  findAll() {
    return this.prisma.division.findMany()
  }

  findOne(id: string) {
    return this.prisma.division.findUnique({
      where: { id },
    })
  }

  remove(id: string) {
    return this.prisma.division.delete({
      where: { id },
    })
  }
}
