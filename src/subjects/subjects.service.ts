import { Injectable } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        name: dto.name,
        goal: {
          connect: {
            id: dto.goalId,
          },
        },
      },
    })
  }

  async findAll() {
    return this.prisma.subject.findMany()
  }

  async findOne(id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
    })
  }

  async remove(id: string) {
    return this.prisma.subject.delete({
      where: { id },
    })
  }
}
