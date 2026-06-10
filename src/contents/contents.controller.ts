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

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { ContentsService } from './contents.service'
import { CreateContentDto } from './dto/create-content.dto'
import { UpdateContentDto } from './dto/update-content.dto'

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { CurrentUser } from '@/auth/decorators/current-user.decorator'
import type { AuthUser } from '@/auth/types/auth-user.type'
@ApiTags('Contents')
@ApiBearerAuth()
@Controller('contents')
@UseGuards(JwtAuthGuard)
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @ApiOperation({ summary: 'Create a new content' })
  @Post()
  create(@Body() dto: CreateContentDto, @CurrentUser() user: AuthUser) {
    return this.contentsService.create(dto, user.id)
  }

  @ApiOperation({ summary: 'Find all contents' })
  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.contentsService.findAll(user.id)
  }

  @ApiOperation({ summary: 'Find a content by ID' })
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.contentsService.findOne(id, user.id)
  }

  @ApiOperation({ summary: 'Find contents by division ID' })
  @Get('/division/:divisionId')
  findByDivision(
    @Param('divisionId') divisionId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.contentsService.findByDivision(divisionId, user.id)
  }

  @ApiOperation({ summary: 'Update a content' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateContentDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.contentsService.update(id, user.id, dto)
  }

  @ApiOperation({ summary: 'Delete a content' })
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.contentsService.remove(id, user.id)
  }
}
