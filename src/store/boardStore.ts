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
  timestamp: string
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

    const updatedTasks = [...get().tasks, newTask]

    const newActivity: ActivityItem = {
      id: crypto.randomUUID(),
      message: `Task "${newTask.title}" created`,
      timestamp: new Date().toISOString(),
    }

    const updatedActivity = [newActivity, ...get().activity].slice(0, 20)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivity))

    set({
      tasks: updatedTasks,
      activity: updatedActivity,
    })
  },

  deleteTask: (id) => {
    const task = get().tasks.find((t) => t.id === id)
    const updatedTasks = get().tasks.filter((t) => t.id !== id)

    const newActivity: ActivityItem = {
      id: crypto.randomUUID(),
      message: `Task "${task?.title}" deleted`,
      timestamp: new Date().toISOString(),
    }

    const updatedActivity = [newActivity, ...get().activity].slice(0, 20)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivity))

    set({
      tasks: updatedTasks,
      activity: updatedActivity,
    })
  },

  moveTask: (id, column) => {
    const task = get().tasks.find((t) => t.id === id)

    const updatedTasks = get().tasks.map((t) =>
      t.id === id ? { ...t, column } : t
    )

    const newActivity: ActivityItem = {
      id: crypto.randomUUID(),
      message: `Task "${task?.title}" moved to ${column}`,
      timestamp: new Date().toISOString(),
    }

    const updatedActivity = [newActivity, ...get().activity].slice(0, 20)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivity))

    set({
      tasks: updatedTasks,
      activity: updatedActivity,
    })
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
