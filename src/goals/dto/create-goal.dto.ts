import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsOptional, IsString } from 'class-validator'

export class CreateGoalDto {
  @ApiProperty({
    example: 'ENEM 2027',
  })
  @IsString()
  title!: string

  @ApiProperty({
    example: '2027-11-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  examDate?: string
}
