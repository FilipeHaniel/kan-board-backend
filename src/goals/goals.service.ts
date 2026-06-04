import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateGoalDto } from './dto/create-goal.dto'

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: {
        title: dto.title,
        examDate: dto.examDate ? new Date(dto.examDate) : null,

        user: {
          connect: {
            id: dto.userId,
          },
        },
      },
    })
  }

  findAll() {
    return this.prisma.goal.findMany({
      include: {
        subjects: true,
      },
    })
  }

  findOne(id: string) {
    return this.prisma.goal.findUnique({
      where: { id },
    })
  }

  remove(id: string) {
    return this.prisma.goal.delete({
      where: { id },
    })
  }
}
