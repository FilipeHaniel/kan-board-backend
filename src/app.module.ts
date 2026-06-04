import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { StudySessionsModule } from './study-sessions/study-sessions.module'
import { StreakModule } from './streak/streak.module'
import { ReviewsModule } from './reviews/reviews.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { GoalsModule } from './goals/goals.module'
import { SubjectsModule } from './subjects/subjects.module'
import { DivisionsModule } from './divisions/divisions.module'
import { ContentsModule } from './contents/contents.module'

@Module({
  imports: [
    TasksModule,
    StudySessionsModule,
    StreakModule,
    ReviewsModule,
    PrismaModule,
    UsersModule,
    GoalsModule,
    SubjectsModule,
    DivisionsModule,
    ContentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
