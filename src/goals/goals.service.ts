import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateGoalDto } from './dto/create-goal.dto'
import { UpdateGoalDto } from './dto/update-goal.dto'

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGoalDto, userId: string) {
    return this.prisma.goal.create({
      data: {
        title: dto.title,
        examDate: dto.examDate,
        userId,
      },
    })
  }

  async findByUser(userId: string) {
    return this.prisma.goal.findMany({
      where: {
        userId,
        isActive: true,
      },
    })
  }

  async findOne(id: string, userId: string) {
    const goal = await this.prisma.goal.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!goal) {
      throw new NotFoundException('Goal not found')
    }

    return goal
  }

  async update(id: string, userId: string, dto: UpdateGoalDto) {
    return this.prisma.goal.updateMany({
      where: {
        id,
        userId,
      },
      data: dto,
    })
  }

  async remove(id: string, userId: string) {
    return this.prisma.goal.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        isActive: false,
      },
    })
  }
}
