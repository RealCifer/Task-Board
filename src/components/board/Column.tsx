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
    if (taskId) {
      moveTask(taskId, columnId)
    }
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
        borderRadius: "18px",
        padding: "22px",
        minHeight: "450px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
        border: isOver
          ? "2px dashed #6366f1"
          : "2px solid transparent",
        transition: "all 0.2s ease",
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
            background: "#eef2ff",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {count}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {children}
      </div>
    </div>
  )
}

export default Column
