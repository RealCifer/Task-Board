import { useState } from "react"
import { motion } from "framer-motion"
import { useBoardStore } from "../../store/boardStore"
import { ColumnType } from "../../types/task"

interface ColumnProps {
  title: string
  columnId: ColumnType
  count: number
  collapsed: boolean
  onToggle: () => void
  children?: React.ReactNode
}

function Column({
  title,
  columnId,
  count,
  collapsed,
  onToggle,
  children,
}: ColumnProps) {
  const moveTask = useBoardStore((state) => state.moveTask)
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("taskId")
    if (taskId) moveTask(taskId, columnId)
    setIsOver(false)
  }

  return (
    <motion.div
      layout
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={() => setIsOver(false)}
      className={`rounded-2xl p-6 transition-all ${
        isOver
          ? "bg-indigo-600/10 border-2 border-indigo-500"
          : "bg-slate-900/50 border border-slate-800"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3>{title}</h3>

        <div className="flex items-center gap-3">
          <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full">
            {count}
          </span>

          <button
            onClick={onToggle}
            className="text-xs text-slate-400"
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
        </div>
      </div>

      <motion.div
        layout
        initial={false}
        animate={{ height: collapsed ? 0 : "auto", opacity: collapsed ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 overflow-hidden"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Column
