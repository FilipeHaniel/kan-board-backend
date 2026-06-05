import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { ContentsService } from './contents.service'
import { CreateContentDto } from './dto/create-content.dto'
import { UpdateContentDto } from './dto/update-content.dto'

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto)
  }

  @Get()
  findAll() {
    return this.contentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(id, updateContentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(id)
  }

  @Patch(':id/move')
  move(
    @Param('id') id: string,
    @Body('status') status: 'BACKLOG' | 'TODAY' | 'DONE',
  ) {
    return this.contentsService.move(id, status)
  }

  @Get('/division/:divisionId')
  findByDivision(@Param('divisionId') divisionId: string) {
    return this.contentsService.findByDivision(divisionId)
  }

  @Patch(':id/reorder')
  reorder(@Param('id') id: string, @Body('position') position: number) {
    return this.contentsService.reorder(id, position)
  }
}
