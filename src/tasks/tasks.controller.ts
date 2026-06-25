import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { MoveTaskDto } from './dto/move-task.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  create(@Body() dto: CreateTaskDto, @CurrentUser() user: AuthUser) {
    return this.tasksService.create(dto, user.id)
  }

  @ApiOperation({ summary: 'Find all tasks for the current user' })
  @Get('/goals/:goalId/tasks')
  findAll(@CurrentUser() user: AuthUser) {
    return this.tasksService.findAll(user.id)
  }

  @ApiOperation({ summary: 'Find a task by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.tasksService.findOne(id, user.id)
  }

  @ApiOperation({ summary: 'Find tasks by content ID' })
  @Get('/content/:contentId')
  findByContent(
    @Param('contentId') contentId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.findByContent(contentId, user.id)
  }

  @ApiOperation({ summary: 'Update a task' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.update(id, user.id, dto)
  }

  @ApiOperation({ summary: 'Move a task to a different status' })
  @Patch(':id/move')
  move(
    @Param('id') id: string,
    @Body() dto: MoveTaskDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.tasksService.move(id, user.id, dto)
  }

  @ApiOperation({ summary: 'Delete a task' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.tasksService.remove(id, user.id)
  }
}
