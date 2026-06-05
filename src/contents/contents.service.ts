import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContentDto } from './dto/create-content.dto'
import { UpdateContentDto } from './dto/update-content.dto'

@Injectable()
export class ContentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContentDto) {
    const divisionExists = await this.prisma.division.findUnique({
      where: {
        id: dto.divisionId,
      },
    })

    if (!divisionExists) {
      throw new NotFoundException('Division not found')
    }

    return this.prisma.content.create({
      data: {
        title: dto.title,
        status: dto.status ?? 'BACKLOG',
        divisionId: dto.divisionId,
      },
    })
  }

  async findAll() {
    return this.prisma.content.findMany({
      include: {
        division: {
          include: {
            subject: {
              include: {
                goal: true,
              },
            },
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async findOne(id: string) {
    const content = await this.prisma.content.findUnique({
      where: { id },
      include: {
        division: {
          include: {
            subject: true,
          },
        },
      },
    })

    if (!content) {
      throw new NotFoundException('Content not found')
    }

    return content
  }

  async update(id: string, dto: UpdateContentDto) {
    await this.findOne(id)

    return this.prisma.content.update({
      where: { id },
      data: {
        title: dto.title,
        status: dto.status,
      },
    })
  }

  async remove(id: string) {
    await this.findOne(id)

    return this.prisma.content.delete({
      where: { id },
    })
  }

  async move(id: string, status: 'BACKLOG' | 'TODAY' | 'DONE') {
    await this.findOne(id)

    return this.prisma.content.update({
      where: { id },
      data: {
        status,
      },
    })
  }

  async findByDivision(divisionId: string) {
    return this.prisma.content.findMany({
      where: {
        divisionId,
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async reorder(id: string, position: number) {
    await this.findOne(id)

    return this.prisma.content.update({
      where: {
        id,
      },
      data: {
        position,
      },
    })
  }
}
