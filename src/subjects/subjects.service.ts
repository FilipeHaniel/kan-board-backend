import { Injectable } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateSubjectDto) {
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

  findAll() {
    return this.prisma.subject.findMany()
  }

  findOne(id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
    })
  }

  remove(id: string) {
    return this.prisma.subject.delete({
      where: { id },
    })
  }
}
