import { motion } from "framer-motion"
import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"
import { useState } from "react"

interface Props {
  task: Task
  onClick: () => void
}

function TaskCard({ task, onClick }: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask)
  const [hovered, setHovered] = useState(false)

  const handleNativeDragStart = (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.dataTransfer.setData("taskId", task.id)
  }

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.column !== "done"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        transform: hovered ? "rotateX(2deg) rotateY(2deg)" : "none",
      }}
    >
      {}
      <div
        draggable
        onDragStart={handleNativeDragStart}
        onClick={onClick}
        className={`bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-lg relative cursor-pointer ${
          isOverdue ? "border-red-500 ring-1 ring-red-500/40" : ""
        }`}
      >
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-slate-100">
            {task.title}
          </h4>

          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}
            className="text-red-400 text-sm"
          >
            ✕
          </button>
        </div>

        {task.description && (
          <p className="text-sm text-slate-400 mt-2">
            {task.description}
          </p>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-3 text-xs items-center flex-wrap">
          {task.priority && (
            <span
              className={`px-3 py-1 rounded-full font-medium ${
                task.priority === "High"
                  ? "bg-red-500/20 text-red-400"
                  : task.priority === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {task.priority}
            </span>
          )}

          {task.dueDate && (
            <span className="text-slate-400">
               {task.dueDate}
            </span>
          )}

          {isOverdue && (
            <span className="text-red-400 font-medium">
               Overdue
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard
