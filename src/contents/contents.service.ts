import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContentDto } from './dto/create-content.dto'
import { UpdateContentDto } from './dto/update-content.dto'
import { ContentStatus, TaskStatus } from '@prisma/client'

@Injectable()
export class ContentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContentDto) {
    return this.prisma.content.create({
      data: {
        title: dto.title,
        divisionId: dto.divisionId,
        status: dto.status,
      },
    })
  }

  async findAll() {
    return this.prisma.content.findMany({
      include: {
        division: true,
        tasks: true,
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.content.findUnique({
      where: { id },
      include: {
        division: true,
        tasks: true,
      },
    })
  }

  async findByDivision(divisionId: string) {
    return this.prisma.content.findMany({
      where: {
        divisionId,
      },
      include: {
        tasks: true,
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async update(id: string, dto: UpdateContentDto) {
    return this.prisma.content.update({
      where: { id },
      data: dto,
    })
  }

  async remove(id: string) {
    return this.prisma.content.delete({
      where: { id },
    })
  }

  async updateStatusFromTasks(contentId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        contentId,
      },
    })

    const total = tasks.length
    const done = tasks.filter((task) => task.status === TaskStatus.DONE).length

    let status: ContentStatus = ContentStatus.NOT_STARTED

    if (total > 0) {
      if (done === total) {
        status = ContentStatus.DONE
      } else if (done > 0) {
        status = ContentStatus.IN_PROGRESS
      }
    }

    return this.prisma.content.update({
      where: {
        id: contentId,
      },
      data: {
        status,
      },
    })
  }
}
