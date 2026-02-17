import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"

interface Props {
  task: Task
  onClose: () => void
}

type PriorityType = "Low" | "Medium" | "High"

function EditTaskDrawer({ task, onClose }: Props) {
  const updateTask = useBoardStore((state) => state.updateTask)

  const [form, setForm] = useState<{
    title: string
    description: string
    priority: PriorityType
    dueDate: string
    tags: string
  }>({
    title: task.title,
    description: task.description || "",
    priority: (task.priority || "Low") as PriorityType,
    dueDate: task.dueDate || "",
    tags: task.tags?.join(", ") || "",
  })

  useEffect(() => {
    setForm({
      title: task.title,
      description: task.description || "",
      priority: (task.priority || "Low") as PriorityType,
      dueDate: task.dueDate || "",
      tags: task.tags?.join(", ") || "",
    })
  }, [task])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  const handleSave = () => {
    updateTask(task.id, {
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    })

    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="w-full max-w-md h-full bg-slate-900 border-l border-slate-700 p-8 shadow-2xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-8 text-slate-100">
            Edit Task
          </h2>

          <div className="space-y-5">
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />

            <input
              value={form.tags}
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
              placeholder="Tags (comma separated)"
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value as PriorityType,
                })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
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
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            />

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 rounded-lg bg-indigo-600"
              >
                Save
              </button>

              <button
                onClick={onClose}
                className="px-4 py-3 rounded-lg bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EditTaskDrawer
