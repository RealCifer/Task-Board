import { useState, useEffect } from "react"
import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"

interface Props {
  task: Task | null
  onClose: () => void
}

function EditTaskDrawer({ task, onClose }: Props) {
  const updateTask = useBoardStore((state) => state.updateTask)

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  })

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description || "",
        priority: task.priority || "Low",
        dueDate: task.dueDate || "",
      })
    }
  }, [task])

  if (!task) return null

  const handleSave = () => {
    updateTask(task.id, form)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="ml-auto relative w-full max-w-md bg-slate-900 border-l border-slate-800 h-full shadow-2xl p-8 space-y-6">

        <h2 className="text-xl font-semibold text-white">
          Edit Task
        </h2>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
        />

        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
        />

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTaskDrawer
