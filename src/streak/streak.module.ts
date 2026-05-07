import { Module } from '@nestjs/common'
import { StreakService } from './streak.service'
import { StreakController } from './streak.controller'
import { StudySessionsModule } from '@/study-sessions/study-sessions.module'

@Module({
  imports: [StudySessionsModule],
  controllers: [StreakController],
  providers: [StreakService],
})
export class StreakModule {}
