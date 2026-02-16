import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useBoardStore } from "../store/boardStore"
import Column from "../components/board/Column"
import TaskCard from "../components/task/TaskCard"
import ActivityLog from "../components/board/ActivityLog"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)
  const { tasks, addTask, loadTasks, resetBoard } = useBoardStore()

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
    if (window.confirm("Are you sure you want to reset the board?")) {
      resetBoard()
    }
  }

  const todoTasks = tasks.filter((t) => t.column === "todo")
  const doingTasks = tasks.filter((t) => t.column === "doing")
  const doneTasks = tasks.filter((t) => t.column === "done")

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #eef2ff, #f8fafc)",
        display: "flex",
        flexDirection: "column",
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
        <h1 style={{ fontSize: "22px", fontWeight: 600 }}>
          Task Board
        </h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleReset}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#f59e0b",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset
          </button>

          <button
            onClick={logout}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#ef4444",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* FORM */}
        <div
          style={{
            marginBottom: "50px",
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
            }}
          />

          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              resize: "none",
            }}
          />

          <div style={{ display: "flex", gap: "15px" }}>
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
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
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            />

            <button
              onClick={handleAdd}
              style={{
                padding: "14px 24px",
                borderRadius: "12px",
                border: "none",
                background:
                  "linear-gradient(90deg, #4f46e5, #6366f1)",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add Task
            </button>
          </div>
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

export default BoardPage
