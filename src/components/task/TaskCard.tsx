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
        borderRadius: "14px",
        padding: "14px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        position: "relative",
        cursor: "grab",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0px)")
      }
    >
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          position: "absolute",
          top: "8px",
          right: "10px",
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
        <p style={{ fontSize: "13px", color: "#6b7280" }}>
          {task.description}
        </p>
      )}

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            background: priorityColor,
            fontSize: "12px",
            fontWeight: 500,
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
