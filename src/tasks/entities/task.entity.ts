export class Task {
  id!: string
  title!: string
  status!: 'backlog' | 'today' | 'done'
  subject!: string
  division!: string
}
