import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useBoardStore } from "../store/boardStore"
import Column from "../components/board/Column"
import TaskCard from "../components/task/TaskCard"
import ActivityLog from "../components/board/ActivityLog"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)
  const { tasks, addTask, loadTasks, resetBoard } = useBoardStore()

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  )

  const [search, setSearch] = useState("")
  const [filterPriority, setFilterPriority] = useState("All")

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  })

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const handleAdd = () => {
    if (!form.title.trim()) return

    addTask({
      title: form.title.trim(),
      description: form.description,
      priority: form.priority as "Low" | "Medium" | "High",
      dueDate: form.dueDate,
    })

    setForm({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
    })
  }

  const handleReset = () => {
    if (window.confirm("Reset entire board?")) {
      resetBoard()
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase())

    const matchesPriority =
      filterPriority === "All" || task.priority === filterPriority

    return matchesSearch && matchesPriority
  })

  const todoTasks = filteredTasks.filter((t) => t.column === "todo")
  const doingTasks = filteredTasks.filter((t) => t.column === "doing")
  const doneTasks = filteredTasks.filter((t) => t.column === "done")

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition">

      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white">
            Task Board
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition"
            >
              Reset
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* CREATE TASK */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md mb-8 space-y-4">
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Create Task
          </h3>

          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
          />

          <div className="flex gap-4">
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
            />

            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex gap-4 mb-8">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
          />

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column title="Todo" columnId="todo" count={todoTasks.length}>
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>

          <Column title="Doing" columnId="doing" count={doingTasks.length}>
            {doingTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>

          <Column title="Done" columnId="done" count={doneTasks.length}>
            {doneTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Column>
        </div>

        <ActivityLog />
      </div>
    </div>
  )
}

export default BoardPage
