import { IsString } from 'class-validator'

export class CreateStudySessionDto {
  @IsString()
  goalId!: string
}
