import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"

interface Props {
  task: Task
}

function TaskCard({ task }: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask)

  return (
    <div
      style={{
        background: "white",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "14px" }}>{task.title}</span>

      <button
        onClick={() => deleteTask(task.id)}
        style={{
          border: "none",
          background: "transparent",
          color: "#ef4444",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ✕
      </button>
    </div>
  )
}

export default TaskCard
