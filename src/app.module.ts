import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TasksModule } from './tasks/tasks.module'
import { StudySessionsModule } from './study-sessions/study-sessions.module';
import { StreakModule } from './streak/streak.module';

@Module({
  imports: [TasksModule, StudySessionsModule, StreakModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
