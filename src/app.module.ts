import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { StudySessionsModule } from './study-sessions/study-sessions.module';
import { StreakModule } from './streak/streak.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [TasksModule, StudySessionsModule, StreakModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
