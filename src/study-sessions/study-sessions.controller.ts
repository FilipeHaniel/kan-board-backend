import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'

import { CreateStudySessionDto } from './dto/create-study-session.dto'
import { AddTaskToSessionDto } from './dto/add-task-to-session.dto'
import { StudySessionsService } from './study-sessions.service'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'

@ApiTags('study-sessions')
@ApiBearerAuth()
@Controller('study-sessions')
@UseGuards(JwtAuthGuard)
export class StudySessionsController {
  constructor(private readonly studySessionsService: StudySessionsService) {}

  @ApiOperation({ summary: 'Create a new study session' })
  @Post()
  create(@Body() dto: CreateStudySessionDto) {
    return this.studySessionsService.create(dto)
  }

  @ApiOperation({ summary: 'get studt session' })
  @Get()
  findAll() {
    return this.studySessionsService.findAll()
  }

  @ApiOperation({ summary: 'Create a study session by id' })
  @Patch(':id/finish')
  finish(@Param('id') id: string) {
    return this.studySessionsService.finish(id)
  }

  @ApiOperation({ summary: 'Create a study sessio group of tasks' })
  @Post(':id/tasks')
  addTask(
    @Param('id') studySessionId: string,
    @Body() dto: AddTaskToSessionDto,
  ) {
    return this.studySessionsService.addTask(studySessionId, dto)
  }
}
