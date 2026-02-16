import { create } from "zustand"
import { Task, ColumnType } from "../types/task"

interface NewTaskInput {
  title: string
  description?: string
  priority?: "Low" | "Medium" | "High"
  dueDate?: string
}

interface ActivityItem {
  id: string
  message: string
  timestamp: number
}

interface BoardState {
  tasks: Task[]
  activity: ActivityItem[]
  addTask: (task: NewTaskInput) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, column: ColumnType) => void
  loadTasks: () => void
  resetBoard: () => void
}

const STORAGE_KEY = "task-board"
const ACTIVITY_KEY = "task-board-activity"

export const useBoardStore = create<BoardState>((set, get) => ({

  tasks: [],
  activity: [],

  loadTasks: () => {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    const storedActivity = localStorage.getItem(ACTIVITY_KEY)

    if (storedTasks) {
      set({ tasks: JSON.parse(storedTasks) })
    }

    if (storedActivity) {
      set({ activity: JSON.parse(storedActivity) })
    }
  },

  addActivityInternal: (message: string) => {
    const newActivity: ActivityItem = {
      id: crypto.randomUUID(),
      message,
      timestamp: Date.now(),
    }

    const updatedActivity = [newActivity, ...get().activity].slice(0, 30)

    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivity))

    set({ activity: updatedActivity })
  },

  addTask: (taskData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || "Low",
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString(),
      column: "todo",
    }

    const updatedTasks = [...get().tasks, newTask]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))

    set({ tasks: updatedTasks })

    get().addActivityInternal(`Task "${newTask.title}" created`)
  },

  deleteTask: (id) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return

    const updatedTasks = get().tasks.filter((t) => t.id !== id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))

    set({ tasks: updatedTasks })

    get().addActivityInternal(`Task "${task.title}" deleted`)
  },

  moveTask: (id, column) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return

    if (task.column === column) return

    const updatedTasks = get().tasks.map((t) =>
      t.id === id ? { ...t, column } : t
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))

    set({ tasks: updatedTasks })

    get().addActivityInternal(`Task "${task.title}" moved to ${column}`)
  },

  resetBoard: () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(ACTIVITY_KEY)

    set({
      tasks: [],
      activity: [],
    })
  },

}))
