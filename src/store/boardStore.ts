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

interface Snapshot {
  tasks: Task[]
  activity: ActivityItem[]
}

interface BoardState {
  tasks: Task[]
  activity: ActivityItem[]
  history: Snapshot[]
  addTask: (task: NewTaskInput) => void
  updateTask: (id: string, data: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, column: ColumnType) => void
  undo: () => void
  exportBoard: () => void
  loadTasks: () => void
  resetBoard: () => void
}

const STORAGE_KEY = "task-board"
const ACTIVITY_KEY = "task-board-activity"

export const useBoardStore = create<BoardState>((set, get) => ({

  tasks: [],
  activity: [],
  history: [],

  saveSnapshot: () => {
    const snapshot: Snapshot = {
      tasks: get().tasks,
      activity: get().activity,
    }
    set({ history: [...get().history, snapshot].slice(-20) })
  },

  loadTasks: () => {
    const storedTasks = localStorage.getItem(STORAGE_KEY)
    const storedActivity = localStorage.getItem(ACTIVITY_KEY)

    if (storedTasks) set({ tasks: JSON.parse(storedTasks) })
    if (storedActivity) set({ activity: JSON.parse(storedActivity) })
  },

  addActivityInternal: (message: string) => {
    const newActivity: ActivityItem = {
      id: crypto.randomUUID(),
      message,
      timestamp: Date.now(),
    }

    const updatedActivity = [newActivity, ...get().activity].slice(0, 50)

    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updatedActivity))
    set({ activity: updatedActivity })
  },

  addTask: (taskData) => {
    get().saveSnapshot()

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

  updateTask: (id, data) => {
    get().saveSnapshot()

    const updatedTasks = get().tasks.map((task) =>
      task.id === id ? { ...task, ...data } : task
    )

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
    set({ tasks: updatedTasks })

    const task = updatedTasks.find((t) => t.id === id)
    if (task) get().addActivityInternal(`Task "${task.title}" updated`)
  },

  deleteTask: (id) => {
    get().saveSnapshot()

    const task = get().tasks.find((t) => t.id === id)
    if (!task) return

    const updatedTasks = get().tasks.filter((t) => t.id !== id)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks))
    set({ tasks: updatedTasks })

    get().addActivityInternal(`Task "${task.title}" deleted`)
  },

  moveTask: (id, column) => {
    get().saveSnapshot()

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

  undo: () => {
    const history = get().history
    if (history.length === 0) return

    const previous = history[history.length - 1]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(previous.tasks))
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(previous.activity))

    set({
      tasks: previous.tasks,
      activity: previous.activity,
      history: history.slice(0, -1),
    })
  },

  exportBoard: () => {
    const data = JSON.stringify(get().tasks, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "task-board.json"
    a.click()
  },

  resetBoard: () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(ACTIVITY_KEY)
    set({ tasks: [], activity: [], history: [] })
  },

}))
