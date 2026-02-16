import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useBoardStore } from "../store/boardStore"
import Column from "../components/board/Column"
import TaskCard from "../components/task/TaskCard"
import ActivityLog from "../components/board/ActivityLog"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)
  const { tasks, addTask, loadTasks, resetBoard } = useBoardStore()

  const [darkMode, setDarkMode] = useState(false)
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

  // 🔥 FILTER + SEARCH LOGIC
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

  const bgColor = darkMode
    ? "#0f172a"
    : "linear-gradient(to bottom, #eef2ff, #f8fafc)"

  const cardBg = darkMode ? "#1e293b" : "white"
  const textColor = darkMode ? "white" : "black"

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgColor,
        color: textColor,
        transition: "all 0.3s ease",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(90deg, #4f46e5, #6366f1)",
          padding: "22px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1>Task Board</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button onClick={handleReset}>Reset</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div
        style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* STATS BAR */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <StatCard title="Total" value={tasks.length} />
          <StatCard title="Todo" value={todoTasks.length} />
          <StatCard title="Doing" value={doingTasks.length} />
          <StatCard title="Done" value={doneTasks.length} />
        </div>

        {/* SEARCH + FILTER */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px", flex: 1 }}
          />

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* BOARD */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
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

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        background: "white",
        padding: "18px",
        borderRadius: "14px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        minWidth: "120px",
      }}
    >
      <div style={{ fontSize: "13px", color: "#6b7280" }}>{title}</div>
      <div style={{ fontSize: "22px", fontWeight: 600 }}>{value}</div>
    </div>
  )
}

export default BoardPage
