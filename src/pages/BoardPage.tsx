import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useBoardStore } from "../store/boardStore"
import Column from "../components/board/Column"
import TaskCard from "../components/task/TaskCard"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)
  const { tasks, addTask, loadTasks } = useBoardStore()

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

  const todoTasks = tasks.filter((t) => t.column === "todo")
  const doingTasks = tasks.filter((t) => t.column === "doing")
  const doneTasks = tasks.filter((t) => t.column === "done")

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      
      {}
      <div
        style={{
          background: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h1 style={{ fontSize: "22px" }}>Task Board</h1>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
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

      {}
      <div style={{ padding: "30px 40px" }}>

        {}
        <div
          style={{
            marginBottom: "30px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "12px", marginBottom: "4px" }}>
              Title
            </label>
            <input
              placeholder="Enter task title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "12px", marginBottom: "4px" }}>
              Description
            </label>
            <textarea
              placeholder="Optional description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            />
          </div>

          {}
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "flex-end",
            }}
          >
            {}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "12px", marginBottom: "4px" }}>
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "12px", marginBottom: "4px" }}>
                Due Date
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            {}
            <button
              onClick={handleAdd}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#4f46e5",
                color: "white",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add Task
            </button>
          </div>
        </div>

        {}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
          }}
        >
          <Column title="Todo">
            {todoTasks.length === 0
              ? <EmptyState />
              : todoTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
          </Column>

          <Column title="Doing">
            {doingTasks.length === 0
              ? <EmptyState />
              : doingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
          </Column>

          <Column title="Done">
            {doneTasks.length === 0
              ? <EmptyState />
              : doneTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
          </Column>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: "8px",
        border: "2px dashed #e5e7eb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#9ca3af",
        fontSize: "14px",
      }}
    >
      No tasks yet
    </div>
  )
}

export default BoardPage
