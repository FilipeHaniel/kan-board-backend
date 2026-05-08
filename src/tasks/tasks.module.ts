import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { ReviewsModule } from '@/reviews/reviews.module'

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [ReviewsModule],
})
export class TasksModule {}
