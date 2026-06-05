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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(id, updateContentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(id)
  }

  @Get('/division/:divisionId')
  findByDivision(@Param('divisionId') divisionId: string) {
    return this.contentsService.findByDivision(divisionId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(id)
  }
}
