import { create } from "zustand"
import { Task, ColumnType } from "../types/task"

interface NewTaskInput {
  title: string
  description?: string
  priority?: "Low" | "Medium" | "High"
  dueDate?: string
}

interface BoardState {
  tasks: Task[]
  addTask: (task: NewTaskInput) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, column: ColumnType) => void
  loadTasks: () => void
  resetBoard: () => void
}

const STORAGE_KEY = "task-board"

export const useBoardStore = create<BoardState>((set, get) => ({
  tasks: [],

  loadTasks: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return

      const parsed: Task[] = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        set({ tasks: parsed })
      }
    } catch {
      set({ tasks: [] })
    }
  },

  addTask: (taskData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString(),
      column: "todo",
    }

    const updated = [...get().tasks, newTask]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    set({ tasks: updated })
  },

  deleteTask: (id) => {
    const updated = get().tasks.filter((t) => t.id !== id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    set({ tasks: updated })
  },

  moveTask: (id, column) => {
    const updated = get().tasks.map((t) =>
      t.id === id ? { ...t, column } : t
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    set({ tasks: updated })
  },

  resetBoard: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ tasks: [] })
  },
}))
