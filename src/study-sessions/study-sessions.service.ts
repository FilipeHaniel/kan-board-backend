import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'

import { CreateStudySessionDto } from './dto/create-study-session.dto'
import { AddTaskToSessionDto } from './dto/add-task-to-session.dto'

@Injectable()
export class StudySessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStudySessionDto) {
    return this.prisma.studySession.create({
      data: {
        goalId: dto.goalId,
      },
    })
  }

  async findAll() {
    return this.prisma.studySession.findMany({
      include: {
        tasks: {
          include: {
            task: true,
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
    })
  }

  async finish(id: string) {
    return this.prisma.studySession.update({
      where: {
        id,
      },
      data: {
        finishedAt: new Date(),
      },
    })
  }

  async addTask(studySessionId: string, dto: AddTaskToSessionDto) {
    const alreadyExists = await this.prisma.studySessionTask.findFirst({
      where: {
        studySessionId,
        taskId: dto.taskId,
      },
    })

    if (alreadyExists) {
      throw new BadRequestException('Task already added to this study session')
    }

    const session = await this.prisma.studySession.findUnique({
      where: {
        id: studySessionId,
      },
    })

    if (!session) {
      throw new NotFoundException('Study session not found')
    }

    return this.prisma.studySessionTask.create({
      data: {
        studySessionId,
        taskId: dto.taskId,
        completedAt: new Date(),
      },
      include: {
        task: true,
      },
    })
  }
}
