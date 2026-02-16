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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 transition-all duration-500">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Task Board
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition text-sm"
              title="Toggle theme"
            >
              {darkMode ? "☀ Light" : "🌙 Dark"}
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 transition text-sm font-medium"
              title="Reset board"
            >
              Reset
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-sm font-medium"
              title="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* CREATE TASK */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl mb-10">
          <h3 className="text-lg font-semibold mb-6 text-slate-200">
            Create Task
          </h3>

          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition mb-4"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition mb-4"
          />

          <div className="flex gap-4">
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              className="bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3"
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
              className="bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3"
            />

            <button
              onClick={handleAdd}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition font-medium"
              title="Add new task"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex gap-4 mb-10">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-3"
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
