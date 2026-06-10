import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'

import { ContentsService } from './contents.service'
import { CreateContentDto } from './dto/create-content.dto'
import { UpdateContentDto } from './dto/update-content.dto'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'

@Controller('contents')
@UseGuards(JwtAuthGuard)
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  create(@Body() dto: CreateContentDto, @CurrentUser() user: AuthUser) {
    return this.contentsService.create(dto, user.id)
  }

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.contentsService.findAll(user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.contentsService.findOne(id, user.id)
  }

  @Get('/division/:divisionId')
  findByDivision(
    @Param('divisionId') divisionId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.contentsService.findByDivision(divisionId, user.id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateContentDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.contentsService.update(id, user.id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.contentsService.remove(id, user.id)
  }
}
