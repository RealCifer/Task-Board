import { create } from "zustand"
import { Task, ColumnType } from "../types/task"

interface BoardState {
  tasks: Task[]
  addTask: (title: string) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, column: ColumnType) => void
  loadTasks: () => void
}

const STORAGE_KEY = "task-board"

export const useBoardStore = create<BoardState>((set, get) => ({
  tasks: [],

  loadTasks: () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      set({ tasks: JSON.parse(stored) })
    }
  },

  addTask: (title) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
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
}))
