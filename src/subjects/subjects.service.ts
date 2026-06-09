import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubjectDto, userId: string) {
    const goal = await this.prisma.goal.findFirst({
      where: {
        id: dto.goalId,
        userId,
        isActive: true,
      },
    })

    if (!goal) {
      throw new NotFoundException('Goal not found')
    }

    return this.prisma.subject.create({
      data: {
        name: dto.name,
        goalId: dto.goalId,
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.subject.findMany({
      where: {
        goal: {
          userId,
          isActive: true,
        },
      },
      include: {
        goal: true,
      },
    })
  }

  async findOne(id: string, userId: string) {
    const subject = await this.prisma.subject.findFirst({
      where: {
        id,
        goal: {
          userId,
          isActive: true,
        },
      },
      include: {
        goal: true,
      },
    })

    if (!subject) {
      throw new NotFoundException('Subject not found')
    }

    return subject
  }

  async remove(id: string, userId: string) {
    const subject = await this.prisma.subject.findFirst({
      where: {
        id,
        goal: {
          userId,
          isActive: true,
        },
      },
    })

    if (!subject) {
      throw new NotFoundException('Subject not found')
    }

    return this.prisma.subject.delete({
      where: {
        id,
      },
    })
  }
}
