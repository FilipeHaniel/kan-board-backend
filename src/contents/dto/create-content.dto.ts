import { IsEnum, IsOptional, IsString } from 'class-validator'

export class CreateContentDto {
  @IsString()
  title!: string

  @IsString()
  divisionId!: string

  @IsOptional()
  @IsEnum(['BACKLOG', 'TODAY', 'DONE'])
  status?: 'BACKLOG' | 'TODAY' | 'DONE'
}
