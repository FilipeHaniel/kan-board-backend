import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { StudySessionsModule } from './study-sessions/study-sessions.module'
import { StreakModule } from './streak/streak.module'
import { ReviewsModule } from './reviews/reviews.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    TasksModule,
    StudySessionsModule,
    StreakModule,
    ReviewsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
