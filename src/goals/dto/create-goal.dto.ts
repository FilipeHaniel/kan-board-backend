import { IsDateString, IsOptional, IsString } from 'class-validator'

export class CreateGoalDto {
  @IsString()
  title!: string

  @IsOptional()
  @IsDateString()
  examDate?: string
}
