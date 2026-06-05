import { ContentStatus } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateContentDto {
  @IsString()
  title!: string

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus

  @IsString()
  divisionId!: string
}
