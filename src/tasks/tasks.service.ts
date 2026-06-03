import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './entities/task.entity'
import { ReviewsService } from '@/reviews/reviews.service'

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Funções',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '2',
      title: 'Equações',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '3',
      title: 'Produtos Notáveis',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '4',
      title: 'Fatoração',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '5',
      title: 'Inequações',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '6',
      title: 'Módulo',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '7',
      title: 'Função Afim',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '8',
      title: 'Função Quadrática',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '9',
      title: 'Função Exponencial',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '10',
      title: 'Função Logarítmica',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '11',
      title: 'Progressão Aritmética',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '12',
      title: 'Progressão Geométrica',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '13',
      title: 'Análise Combinatória',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '14',
      title: 'Probabilidade',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '15',
      title: 'Estatística',
      status: 'backlog',
      subject: 'Matemática',
      division: 'Frente A',
    },

    // Hoje
    {
      id: '16',
      title: 'Trigonometria',
      status: 'today',
      subject: 'Matemática',
      division: 'Frente A',
    },
    {
      id: '17',
      title: 'Ciclo Trigonométrico',
      status: 'today',
      subject: 'Matemática',
      division: 'Frente A',
    },

    // Concluído
    {
      id: '18',
      title: 'Geometria Plana',
      status: 'done',
      subject: 'Matemática',
      division: 'Frente B',
    },
    {
      id: '19',
      title: 'Geometria Espacial',
      status: 'done',
      subject: 'Matemática',
      division: 'Frente B',
    },

    // História
    {
      id: '20',
      title: 'Brasil Colônia',
      status: 'backlog',
      subject: 'História',
      division: 'Frente Única',
    },
    {
      id: '21',
      title: 'Império Romano',
      status: 'today',
      subject: 'História',
      division: 'Frente Única',
    },
  ]

  constructor(private readonly reviewsService: ReviewsService) {}

  create(dto: CreateTaskDto) {
    const task: Task = {
      id: randomUUID(),
      title: dto.title,
      status: 'backlog',
      subject: dto.subject,
      division: dto.division,
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
