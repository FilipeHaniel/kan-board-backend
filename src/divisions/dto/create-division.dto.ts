import { IsString } from 'class-validator'

export class CreateDivisionDto {
  @IsString()
  name!: string

  @IsString()
  subjectId!: string
}
