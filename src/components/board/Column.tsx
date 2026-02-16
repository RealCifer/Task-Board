import { useState } from "react"
import { useBoardStore } from "../../store/boardStore"
import { ColumnType } from "../../types/task"

interface ColumnProps {
  title: string
  columnId: ColumnType
  count: number
  children?: React.ReactNode
}

function Column({ title, columnId, count, children }: ColumnProps) {
  const moveTask = useBoardStore((state) => state.moveTask)
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("taskId")
    moveTask(taskId, columnId)
    setIsOver(false)
  }

  const handleLeave = () => {
    setIsOver(false)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleLeave}
      style={{
        background: "white",
        borderRadius: "16px",
        padding: "20px",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        border: isOver ? "2px solid #6366f1" : "1px solid #f3f4f6",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
          {title}
        </h3>

        <span
          style={{
            background: "#e0e7ff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {count}
        </span>
      </div>

      {children}
    </div>
  )
}

export default Column
