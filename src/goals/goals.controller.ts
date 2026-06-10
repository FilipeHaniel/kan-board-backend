import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { GoalsService } from './goals.service'
import { CreateGoalDto } from './dto/create-goal.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { UpdateGoalDto } from './dto/update-goal.dto'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'
@ApiTags('Goals')
@ApiBearerAuth()
@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @ApiOperation({ summary: 'Create a new goal' })
  @Post()
  create(@Body() dto: CreateGoalDto, @CurrentUser() user: AuthUser) {
    return this.goalsService.create(dto, user.id)
  }

  @ApiOperation({ summary: 'Find all goals for the current user' })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.goalsService.findByUser(user.id)
  }

  @ApiOperation({ summary: 'Find a goal by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.goalsService.findOne(id, user.id)
  }

  @ApiOperation({ summary: 'Update a goal' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGoalDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.goalsService.update(id, user.id, dto)
  }

  @ApiOperation({ summary: 'Delete a goal' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.goalsService.remove(id, user.id)
  }
}
