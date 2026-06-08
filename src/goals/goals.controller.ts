import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common'
import { GoalsService } from './goals.service'
import { CreateGoalDto } from './dto/create-goal.dto'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { UpdateGoalDto } from './dto/update-goal.dto'

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateGoalDto, @Request() req: any) {
    return this.goalsService.create(dto, req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    return this.goalsService.findByUser(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.goalsService.findOne(id, req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGoalDto,
    @Request() req: any,
  ) {
    return this.goalsService.update(id, req.user.id, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.goalsService.remove(id, req.user.id)
  }
}
