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
    tags: task.tags?.join(", ") || "",
  })

  // Sync when switching tasks
  useEffect(() => {
    setForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority || "Low",
      dueDate: task.dueDate || "",
      tags: task.tags?.join(", ") || "",
    })
  }, [task])

  // ESC close
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
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex justify-end"
        onClick={onClose}
      >
        <motion.div
          key="drawer"
          initial={{ x: "100%", opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 28,
          }}
          className="w-full max-w-md h-full bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 p-8 shadow-2xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold mb-8 text-slate-100"
          >
            Edit Task
          </motion.h2>

          <div className="space-y-5">
            <input
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Task title"
            />

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Description"
            />

            {/* TAGS INPUT */}
            <input
              value={form.tags}
              onChange={(e) =>
                setForm({ ...form, tags: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Tags (comma separated)"
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition font-medium"
              >
                Save Changes
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EditTaskDrawer
