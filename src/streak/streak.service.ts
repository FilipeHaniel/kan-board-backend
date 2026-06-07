import { Injectable } from '@nestjs/common'
import { StudySessionsService } from '../study-sessions/study-sessions.service'

@Injectable()
export class StreakService {
  constructor(private readonly studySessionsService: StudySessionsService) {}

  async getCurrentStreak() {
    const sessions = await this.studySessionsService.findAll()

    const groupedByDay = new Map<string, number>()

    for (const session of sessions) {
      const day = session.startedAt.toISOString().split('T')[0]

      const current = groupedByDay.get(day) || 0

      groupedByDay.set(day, current + session.durationInMinutes)
    }

    const validDays = [...groupedByDay.entries()]
      .filter(([_, minutes]) => minutes >= 30)
      .map(([day]) => day)
      .sort()
      .reverse()

    let streak = 0

    const today = new Date()

    for (let i = 0; i < validDays.length; i++) {
      const expectedDay = new Date()

      expectedDay.setDate(today.getDate() - i)

      const formatted = expectedDay.toISOString().split('T')[0]

      if (validDays.includes(formatted)) {
        streak++
      } else {
        break
      }
    }

    return {
      streak,
      validDays,
    }
  }
}
