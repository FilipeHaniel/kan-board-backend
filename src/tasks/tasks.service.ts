import { Injectable } from '@nestjs/common'
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

  async create(dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        contentId: dto.contentId,
        estimatedMinutes: dto.estimatedMinutes,
      },
    })
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        content: true,
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    })
  }

  async findByContent(contentId: string) {
    return this.prisma.task.findMany({
      where: {
        contentId,
      },
      orderBy: {
        position: 'asc',
      },
    })
  }

  async update(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: dto,
    })
  }

  async move(id: string, dto: MoveTaskDto) {
    const task = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        status: dto.status,
      },
    })

    await this.contentsService.updateStatusFromTasks(task.contentId)

    return task
  }

  async remove(id: string) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    })
  }
}
