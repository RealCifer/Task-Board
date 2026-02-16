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
      className={`bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-md transition ${
        isOver ? "ring-2 ring-indigo-500" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-800 dark:text-white">
          {title}
        </h3>
        <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">
          {count}
        </span>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  )
}

export default Column
