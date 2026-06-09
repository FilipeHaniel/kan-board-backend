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
import { GoalsService } from './goals.service'
import { CreateGoalDto } from './dto/create-goal.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { UpdateGoalDto } from './dto/update-goal.dto'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() dto: CreateGoalDto, @CurrentUser() user: AuthUser) {
    return this.goalsService.create(dto, user.id)
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.goalsService.findByUser(user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.goalsService.findOne(id, user.id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGoalDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.goalsService.update(id, user.id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.goalsService.remove(id, user.id)
  }
}
