import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Task } from "../../types/task"
import { useBoardStore } from "../../store/boardStore"

interface Props {
  task: Task
  onClose: () => void
}

function EditTaskDrawer({ task, onClose }: Props) {
  const updateTask = useBoardStore((state) => state.updateTask)

  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority || "Low",
    dueDate: task.dueDate || "",
  })

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
      priority: form.priority as "Low" | "Medium" | "High",
      dueDate: form.dueDate,
    })

    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          key="drawer"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 30,
          }}
          className="w-full max-w-md h-full bg-slate-900 border-l border-slate-700 p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-6 text-slate-100">
            Edit Task
          </h2>

          <div className="space-y-4">
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
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
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition font-medium"
              >
                Save Changes
              </button>

              <button
                onClick={onClose}
                className="px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
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
