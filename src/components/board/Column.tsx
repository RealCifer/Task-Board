import { useBoardStore } from "../../store/boardStore"
import { ColumnType } from "../../types/task"

interface ColumnProps {
  title: string
  columnId: ColumnType
  children?: React.ReactNode
}

function Column({ title, columnId, children }: ColumnProps) {
  const moveTask = useBoardStore((state) => state.moveTask)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("taskId")
    moveTask(taskId, columnId)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        background: "#f9fafb",
        padding: "15px",
        borderRadius: "10px",
        minHeight: "450px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>

      <div
        style={{
          flex: 1,
          borderRadius: "8px",
          border: "2px dashed #e5e7eb",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Column
