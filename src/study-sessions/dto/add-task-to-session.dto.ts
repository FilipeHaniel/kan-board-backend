import { IsUUID } from 'class-validator'

export class AddTaskToSessionDto {
  @IsUUID()
  taskId!: string
}
