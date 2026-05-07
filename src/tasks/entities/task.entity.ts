export class Task {
  id!: string
  title!: string
  status!: 'backlog' | 'today' | 'done'
}
