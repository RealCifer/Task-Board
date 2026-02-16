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
        background: "white",
        borderRadius: "12px",
        padding: "16px",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default Column
