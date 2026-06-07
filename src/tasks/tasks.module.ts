import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { PrismaModule } from '@/prisma/prisma.module'
import { ContentsModule } from '@/contents/contents.module'

@Module({
  imports: [PrismaModule, ContentsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
