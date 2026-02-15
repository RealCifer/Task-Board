import { useEffect, useState } from "react"
import { useAuthStore } from "../store/authStore"
import { useBoardStore } from "../store/boardStore"
import Column from "../components/board/Column"
import TaskCard from "../components/task/TaskCard"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)
  const { tasks, addTask, loadTasks } = useBoardStore()

  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleAdd = () => {
    if (!newTitle.trim()) return
    addTask(newTitle.trim())
    setNewTitle("")
  }

  const todoTasks = tasks.filter((t) => t.column === "todo")
  const doingTasks = tasks.filter((t) => t.column === "doing")
  const doneTasks = tasks.filter((t) => t.column === "done")

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      
      {/* HEADER */}
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
            transition: "0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#dc2626")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#ef4444")
          }
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "30px 40px" }}>
        
        {/* ADD TASK BAR */}
        <div
          style={{
            marginBottom: "30px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter task title..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />

          <button
            onClick={handleAdd}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              background: "#4f46e5",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "#4338ca")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "#4f46e5")
            }
          >
            Add Task
          </button>
        </div>

        {/* BOARD GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px",
          }}
        >
          <Column title="Todo">
            {todoTasks.length === 0 ? (
              <EmptyState />
            ) : (
              todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </Column>

          <Column title="Doing">
            {doingTasks.length === 0 ? (
              <EmptyState />
            ) : (
              doingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </Column>

          <Column title="Done">
            {doneTasks.length === 0 ? (
              <EmptyState />
            ) : (
              doneTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
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
