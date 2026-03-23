export type Status =
  | "todo"
  | "inprogress"
  | "review"
  | "done"

export type Priority =
  | "low"
  | "medium"
  | "high"
  | "critical"

export interface Task {
  id: number
  title: string
  assignee: string
  status: Status
  priority: Priority
  startDate?: Date
  dueDate: Date
}