export type ColumnType = "todo" | "doing" | "done"

export interface Task {
  id: string
  title: string
  description?: string
  priority?: "Low" | "Medium" | "High"
  dueDate?: string
  tags?: string[]
  createdAt: string
  column: ColumnType
}
