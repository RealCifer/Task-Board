import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useBoardStore } from "../store/boardStore"
import Column from "../components/board/Column"
import TaskCard from "../components/task/TaskCard"
import ActivityLog from "../components/board/ActivityLog"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)
  const { tasks, addTask, loadTasks, resetBoard } = useBoardStore()

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #eef2ff, #f8fafc)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(90deg, #4f46e5, #6366f1)",
          padding: "24px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1 style={{ fontWeight: 600 }}>Task Board</h1>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={buttonSecondary} onClick={handleReset}>
            Reset
          </button>

          <button style={buttonDanger} onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* ADD TASK CARD */}
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "20px" }}>Create Task</h3>

          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={{ ...inputStyle, height: "80px" }}
          />

          <div style={{ display: "flex", gap: "15px" }}>
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              style={inputStyle}
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
              style={inputStyle}
            />

            <button style={buttonPrimary} onClick={handleAdd}>
              Add Task
            </button>
          </div>
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
            style={{ ...inputStyle, flex: 1 }}
          />

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            style={inputStyle}
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

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  marginBottom: "30px",
  display: "flex",
  flexDirection: "column" as const,
  gap: "15px",
}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  outline: "none",
}

const buttonPrimary = {
  padding: "12px 20px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg,#4f46e5,#6366f1)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
}

const buttonSecondary = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#f3f4f6",
  fontWeight: 500,
  cursor: "pointer",
}

const buttonDanger = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#ef4444",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
}

export default BoardPage
