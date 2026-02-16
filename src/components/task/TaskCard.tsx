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
      className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg transition cursor-grab ${
        isOverdue ? "ring-2 ring-red-500" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-slate-800 dark:text-white">
          {task.title}
        </h4>

        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-600 text-sm"
        >
          ✕
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          {task.description}
        </p>
      )}

      <div className="flex gap-2 mt-3 text-xs">
        <span
          className={`px-2 py-1 rounded-full ${
            task.priority === "High"
              ? "bg-red-100 text-red-600"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
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
          <span className="text-red-500 font-medium">
            ⚠ Overdue
          </span>
        )}
      </div>
    </div>
  )
}

export default TaskCard
