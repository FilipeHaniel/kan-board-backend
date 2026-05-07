import { IsNumber, IsString } from 'class-validator'

export class CreateStudySessionDto {
  @IsString()
  taskId!: string

  @IsNumber()
  durationInMinutes!: number
}
