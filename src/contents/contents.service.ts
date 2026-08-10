import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateContentDto } from './dto/create-content.dto'
import { UpdateContentDto } from './dto/update-content.dto'
import { ContentStatus, TaskStatus } from '@prisma/client'

@Injectable()
export class ContentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContentDto, userId: string) {
    const division = await this.prisma.division.findFirst({
      where: {
        id: dto.divisionId,
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

    return this.prisma.content.create({
      data: {
        title: dto.title,
        divisionId: dto.divisionId,
        status: dto.status,
      },
      include: {
        tasks: true,
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.content.findMany({
      where: {
        division: {
          subject: {
            goal: {
              userId,
              // isActive: true,
            },
          },
        },
      },
      include: {
        division: true,
        tasks: true,
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async findOne(id: string, userId: string) {
    const content = await this.prisma.content.findFirst({
      where: {
        id,
        division: {
          subject: {
            goal: {
              userId,
              // isActive: true,
            },
          },
        },
      },
      include: {
        division: true,
        tasks: true,
      },
    })

    if (!content) {
      throw new NotFoundException('Content not found')
    }

    return content
  }

  async findByDivision(divisionId: string, userId: string) {
    return this.prisma.content.findMany({
      where: {
        divisionId,
        division: {
          subject: {
            goal: {
              userId,
              // isActive: true,
            },
          },
        },
      },
      include: {
        tasks: true,
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async update(id: string, userId: string, dto: UpdateContentDto) {
    const content = await this.prisma.content.findFirst({
      where: {
        id,
        division: {
          subject: {
            goal: {
              userId,
              // isActive: true,
            },
          },
        },
      },
    })

    if (!content) {
      throw new NotFoundException('Content not found')
    }

    return this.prisma.content.update({
      where: {
        id,
      },
      data: dto,
    })
  }

  async remove(id: string, userId: string) {
    const content = await this.prisma.content.findFirst({
      where: {
        id,
        division: {
          subject: {
            goal: {
              userId,
              // isActive: true,
            },
          },
        },
      },
    })

    if (!content) {
      throw new NotFoundException('Content not found')
    }

    return this.prisma.content.delete({
      where: {
        id,
      },
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
