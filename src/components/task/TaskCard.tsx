import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"

interface Props {
  task: Task
}

function TaskCard({ task }: Props) {
  const deleteTask = useBoardStore((state) => state.deleteTask)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id)
  }

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.column !== "done"

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`bg-slate-800/80 border border-slate-700 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-200 relative cursor-grab ${
        isOverdue ? "border-red-500" : ""
      }`}
      title="Drag to move task"
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-slate-100">
          {task.title}
        </h4>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-400 hover:text-red-500 text-sm"
          title="Delete task"
        >
          ✕
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-slate-400 mt-2">
          {task.description}
        </p>
      )}

      <div className="flex gap-2 mt-3 text-xs items-center">
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
    </div>
  )
}

export default TaskCard
