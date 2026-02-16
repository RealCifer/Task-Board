import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"

interface Props {
  task: Task
}

function TaskCard({ task }: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id)
  }

  const priorityColor =
    task.priority === "High"
      ? "#fecaca"
      : task.priority === "Medium"
      ? "#fde68a"
      : "#bbf7d0"

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        padding: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        position: "relative",
        cursor: "grab",
      }}
    >
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          position: "absolute",
          top: "6px",
          right: "8px",
          border: "none",
          background: "transparent",
          color: "#ef4444",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ✕
      </button>

      <h4 style={{ fontSize: "15px", fontWeight: 600 }}>
        {task.title}
      </h4>

      {task.description && (
        <p style={{ fontSize: "13px", color: "#555" }}>
          {task.description}
        </p>
      )}

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span
          style={{
            padding: "3px 8px",
            borderRadius: "6px",
            background: priorityColor,
            fontSize: "12px",
          }}
        >
          {task.priority}
        </span>

        {task.dueDate && (
          <span style={{ fontSize: "12px", color: "#6b7280" }}>
            📅 {task.dueDate}
          </span>
        )}
      </div>
    </div>
  )
}

export default TaskCard
