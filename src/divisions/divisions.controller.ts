import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'

import { DivisionsService } from './divisions.service'
import { CreateDivisionDto } from './dto/create-division.dto'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'

@Controller('divisions')
@UseGuards(JwtAuthGuard)
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @Post()
  create(@Body() dto: CreateDivisionDto, @CurrentUser() user: AuthUser) {
    return this.divisionsService.create(dto, user.id)
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.divisionsService.findAll(user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.divisionsService.findOne(id, user.id)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.divisionsService.remove(id, user.id)
  }
}
