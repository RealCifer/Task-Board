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

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={() => setIsOver(false)}
      className={`rounded-2xl p-6 transition-all duration-300 ${
        isOver
          ? "bg-indigo-600/10 border-2 border-indigo-500 shadow-lg"
          : "bg-slate-900/50 border border-slate-800 hover:shadow-xl"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-200 tracking-tight">
          {title}
        </h3>

        <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full">
          {count}
        </span>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  )
}

export default Column
