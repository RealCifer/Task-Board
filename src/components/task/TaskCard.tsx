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

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id)

    const ghost = document.createElement("div")
    ghost.innerText = task.title
    ghost.style.padding = "8px 16px"
    ghost.style.background = "#4f46e5"
    ghost.style.color = "white"
    ghost.style.borderRadius = "8px"
    ghost.style.position = "absolute"
    ghost.style.top = "-9999px"
    document.body.appendChild(ghost)

    e.dataTransfer.setDragImage(ghost, 0, 0)

    setTimeout(() => {
      document.body.removeChild(ghost)
    }, 0)
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
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      className={`bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-lg relative cursor-pointer transition-all duration-200 ${
        isOverdue ? "border-red-500 ring-1 ring-red-500/40" : ""
      }`}
      style={{
        transform: hovered ? "rotateX(2deg) rotateY(2deg)" : "none",
      }}
      title="Click to edit • Drag to move"
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-slate-100">
          {task.title}
        </h4>

        <button
          onClick={(e) => {
            e.stopPropagation()
            deleteTask(task.id)
          }}
          className="text-red-400 hover:text-red-500 text-sm transition"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      {/* DESCRIPTION */}
      {task.description && (
        <p className="text-sm text-slate-400 mt-2">
          {task.description}
        </p>
      )}

      {/* TAGS */}
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

      {/* META */}
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
            📅 {task.dueDate}
          </span>
        )}

        {isOverdue && (
          <span className="text-red-400 font-medium">
            ⚠ Overdue
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default TaskCard
