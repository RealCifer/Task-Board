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
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1>Task Board</h1>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Add Task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter task title..."
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleAdd}>Add Task</button>
      </div>

      {/* Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <Column title="Todo">
          {todoTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>

        <Column title="Doing">
          {doingTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>

        <Column title="Done">
          {doneTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Column>
      </div>
    </div>
  )
}

export default BoardPage
