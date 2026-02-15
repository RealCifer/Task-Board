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

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        background: "white",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        position: "relative",
        cursor: "grab",
      }}
    >
      {}
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

      <div style={{ fontWeight: 600 }}>{task.title}</div>

      {task.description && (
        <div style={{ fontSize: "12px", color: "#6b7280" }}>
          {task.description}
        </div>
      )}

      <div style={{ fontSize: "11px", display: "flex", gap: "6px" }}>
        {task.priority && (
          <span
            style={{
              padding: "2px 6px",
              borderRadius: "4px",
              background:
                task.priority === "High"
                  ? "#fee2e2"
                  : task.priority === "Medium"
                  ? "#fef3c7"
                  : "#dcfce7",
            }}
          >
            {task.priority}
          </span>
        )}

        {task.dueDate && (
          <span style={{ color: "#6b7280" }}>
            📅 {task.dueDate}
          </span>
        )}
      </div>
    </div>
  )
}

export default TaskCard
