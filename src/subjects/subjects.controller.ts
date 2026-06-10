import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common'

import { SubjectsService } from './subjects.service'
import { CreateSubjectDto } from './dto/create-subject.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Subjects')
@ApiBearerAuth()
@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiOperation({ summary: 'Create a new subject' })
  @Post()
  create(@Body() dto: CreateSubjectDto, @CurrentUser() user: AuthUser) {
    return this.subjectsService.create(dto, user.id)
  }

  @ApiOperation({ summary: 'Find all subjects' })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.subjectsService.findAll(user.id)
  }

  @ApiOperation({ summary: 'Find a subject by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.subjectsService.findOne(id, user.id)
  }

  @ApiOperation({ summary: 'Delete a subject' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.subjectsService.remove(id, user.id)
  }
}
