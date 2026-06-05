import { IsEnum } from 'class-validator'

export enum TaskStatusDto {
  BACKLOG = 'BACKLOG',
  TODAY = 'TODAY',
  DONE = 'DONE',
}

export class MoveTaskDto {
  @IsEnum(TaskStatusDto)
  status!: TaskStatusDto
}
