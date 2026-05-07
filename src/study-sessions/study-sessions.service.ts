import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CreateStudySessionDto } from './dto/create-study-session.dto'
import { StudySession } from './entities/study-session.entity'

@Injectable()
export class StudySessionsService {
  private sessions: StudySession[] = []

  create(dto: CreateStudySessionDto) {
    const now = new Date()

    const session: StudySession = {
      id: randomUUID(),
      taskId: dto.taskId,
      startedAt: now,
      endedAt: now,
      durationInMinutes: dto.durationInMinutes,
    }

    this.sessions.push(session)

    return session
  }

  findAll() {
    return this.sessions
  }
}
