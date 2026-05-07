import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateStudySessionDto } from './dto/create-study-session.dto'
import { StudySessionsService } from './study-sessions.service'

@Controller('study-sessions')
export class StudySessionsController {
  constructor(private readonly studySessionsService: StudySessionsService) {}

  @Post()
  create(@Body() dto: CreateStudySessionDto) {
    return this.studySessionsService.create(dto)
  }

  @Get()
  findAll() {
    return this.studySessionsService.findAll()
  }
}
