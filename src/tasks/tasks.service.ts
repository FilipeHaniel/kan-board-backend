import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { MoveTaskDto } from './dto/move-task.dto'
import { ContentsService } from '@/contents/contents.service'

@Injectable()
export class TasksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly contentsService: ContentsService,
  ) {}

  async create(dto: CreateTaskDto, userId: string) {
    const content = await this.prisma.content.findFirst({
      where: {
        id: dto.contentId,
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

    return this.prisma.task.create({
      data: {
        title: dto.title,
        contentId: dto.contentId,
        estimatedMinutes: dto.estimatedMinutes,
      },
    })
  }

  async findAll(userId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        content: {
          division: {
            subject: {
              goal: {
                userId,
                // isActive: true,
              },
            },
          },
        },
      },
      include: {
        content: {
          include: {
            division: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    })

    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,

      content: task.content.title,
      division: task.content.division.name,
      subject: task.content.division.subject.name,
    }))
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
        content: {
          division: {
            subject: {
              goal: {
                userId,
                // isActive: true,
              },
            },
          },
        },
      },
    })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  async findByContent(contentId: string, userId: string) {
    return this.prisma.task.findMany({
      where: {
        contentId,
        content: {
          division: {
            subject: {
              goal: {
                userId,
                // isActive: true,
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

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.findOne(id, userId)

    return this.prisma.task.update({
      where: {
        id: task.id,
      },
      data: dto,
    })
  }

  async move(id: string, userId: string, dto: MoveTaskDto) {
    const existingTask = await this.findOne(id, userId)

    const task = await this.prisma.task.update({
      where: {
        id: existingTask.id,
      },
      data: {
        status: dto.status,
      },
    })

    await this.contentsService.updateStatusFromTasks(task.contentId)

    return task
  }

  async remove(id: string, userId: string) {
    const task = await this.findOne(id, userId)

    return this.prisma.task.delete({
      where: {
        id: task.id,
      },
    })
  }
}
