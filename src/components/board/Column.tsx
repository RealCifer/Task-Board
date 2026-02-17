import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    if (taskId) {
      moveTask(taskId, columnId)
    }
    setIsOver(false)
  }

  const handleLeave = () => {
    setIsOver(false)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleLeave}
      className={`rounded-2xl p-6 transition-all duration-300 ${
        isOver
          ? "bg-indigo-600/10 border-2 border-indigo-500 shadow-lg"
          : "bg-slate-900/50 border border-slate-800 hover:shadow-xl"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-200 tracking-tight">
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <motion.span
            layout
            key={count}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full"
          >
            {count}
          </motion.span>

          <button
            onClick={onToggle}
            className="text-xs text-slate-400 hover:text-slate-200 transition"
          >
            {collapsed ? "Expand" : "Collapse"}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Column
