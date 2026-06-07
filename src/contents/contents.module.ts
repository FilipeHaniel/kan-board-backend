import { Module } from '@nestjs/common'
import { PrismaModule } from '@/prisma/prisma.module'

import { ContentsController } from './contents.controller'
import { ContentsService } from './contents.service'

@Module({
  imports: [PrismaModule],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
