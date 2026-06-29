import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateDivisionDto } from './dto/create-division.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class DivisionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDivisionDto, userId: string) {
    const subject = await this.prisma.subject.findFirst({
      where: {
        id: dto.subjectId,
        goal: {
          userId,
          // isActive: true,
        },
      },
    })

    if (!subject) {
      throw new NotFoundException('Subject not found')
    }

    return this.prisma.division.create({
      data: {
        name: dto.name,
        subjectId: dto.subjectId,
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.division.findMany({
      where: {
        subject: {
          goal: {
            userId,
            // isActive: true,
          },
        },
      },
      include: {
        subject: true,
      },
    })
  }

  async findOne(id: string, userId: string) {
    const division = await this.prisma.division.findFirst({
      where: {
        id,
        subject: {
          goal: {
            userId,
            // isActive: true,
          },
        },
      },
      include: {
        subject: true,
      },
    })

    if (!division) {
      throw new NotFoundException('Division not found')
    }

    return division
  }

  async remove(id: string, userId: string) {
    const division = await this.prisma.division.findFirst({
      where: {
        id,
        subject: {
          goal: {
            userId,
            // isActive: true,
          },
        },
      },
    })

    if (!division) {
      throw new NotFoundException('Division not found')
    }

    return this.prisma.division.delete({
      where: {
        id,
      },
    })
  }
}
