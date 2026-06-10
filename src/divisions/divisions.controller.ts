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

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'

@ApiTags('Divisions')
@ApiBearerAuth()
@Controller('divisions')
@UseGuards(JwtAuthGuard)
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @ApiOperation({ summary: 'Create a new division' })
  @Post()
  create(@Body() dto: CreateDivisionDto, @CurrentUser() user: AuthUser) {
    return this.divisionsService.create(dto, user.id)
  }

  @ApiOperation({ summary: 'Find all divisions' })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.divisionsService.findAll(user.id)
  }

  @ApiOperation({ summary: 'Find a division by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.divisionsService.findOne(id, user.id)
  }

  @ApiOperation({ summary: 'Delete a division' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.divisionsService.remove(id, user.id)
  }
}
