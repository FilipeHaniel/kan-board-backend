import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './entities/task.entity'
import { ReviewsService } from '@/reviews/reviews.service'

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'Funções - Cap 1', status: 'backlog' },
    { id: '2', title: 'Geometria - Triângulos', status: 'today' },
    { id: '3', title: 'História - Idade Média', status: 'done' },
  ]

  constructor(private readonly reviewsService: ReviewsService) {}

  create(dto: CreateTaskDto) {
    const task: Task = {
      id: randomUUID(),
      title: dto.title,
      status: 'backlog',
    }

    this.tasks.push(task)
    return task
  }

  findAll() {
    return this.tasks
  }

  moveTask(id: string, status: Task['status']) {
    const task = this.tasks.find((t) => t.id === id)
    if (!task) return null

    task.status = status

    if (status === 'done') {
      this.reviewsService.createReviewsForTask(id)
    }

    return task
  }
}
