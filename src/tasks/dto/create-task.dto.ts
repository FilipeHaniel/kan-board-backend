import { IsString, IsOptional, IsInt } from 'class-validator'

export class CreateTaskDto {
  @IsString()
  title!: string

  @IsString()
  contentId!: string

  @IsOptional()
  @IsInt()
  estimatedMinutes?: number
}
