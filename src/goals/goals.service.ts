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
        examDate: dto.examDate ? new Date(dto.examDate) : null,
        userId,
      },
    })
  }

  async findByUser(userId: string) {
    return this.prisma.goal.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async findSubjects(goalId: string, userId: string) {
    await this.findOne(goalId, userId)

    return this.prisma.subject.findMany({
      where: {
        goalId,
      },
      orderBy: {
        name: 'asc',
      },
    })
  }

  async findTasks(goalId: string, userId: string) {
    await this.findOne(goalId, userId)

    const tasks = await this.prisma.task.findMany({
      where: {
        content: {
          division: {
            subject: {
              goalId,
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

    const subjectsMap = new Map<
      string,
      {
        id: string
        name: string
        divisions: any[]
      }
    >()

    for (const task of tasks) {
      const subject = task.content.division.subject
      const division = task.content.division
      const content = task.content

      // Subject
      if (!subjectsMap.has(subject.id)) {
        subjectsMap.set(subject.id, {
          id: subject.id,
          name: subject.name,
          divisions: [],
        })
      }

      const subjectNode = subjectsMap.get(subject.id)!

      // Division
      let divisionNode = subjectNode.divisions.find((d) => d.id === division.id)

      if (!divisionNode) {
        divisionNode = {
          id: division.id,
          name: division.name,
          contents: [],
        }

        subjectNode.divisions.push(divisionNode)
      }

      // Content
      let contentNode = divisionNode.contents.find((c) => c.id === content.id)

      if (!contentNode) {
        contentNode = {
          id: content.id,
          title: content.title,
          status: content.status,
          position: content.position,
          tasks: [],
        }

        divisionNode.contents.push(contentNode)
      }

      // Task
      contentNode.tasks.push({
        id: task.id,
        title: task.title,
        status: task.status,
        position: task.position,
        estimatedMinutes: task.estimatedMinutes,
      })
    }

    return [...subjectsMap.values()]

    // return tasks.map((task) => ({
    //   id: task.id,
    //   title: task.title,
    //   status: task.status,

    //   content: task.content.title,
    //   division: task.content.division.name,
    //   subject: task.content.division.subject.name,
    // }))
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
        // isActive: false,
      },
    })
  }
}
