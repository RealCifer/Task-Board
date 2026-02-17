import { motion } from "framer-motion"
import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"

interface Props {
  task: Task
  onClick: () => void
}

function TaskCard({ task, onClick }: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id)
  }

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-lg relative cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <h4>{task.title}</h4>

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
    </motion.div>
  )
}

export default TaskCard
