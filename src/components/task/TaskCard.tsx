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
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{task.title}</span>
      <button
        onClick={() => deleteTask(task.id)}
        style={{
          border: "none",
          background: "transparent",
          color: "#ef4444",
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  )
}

export default TaskCard
