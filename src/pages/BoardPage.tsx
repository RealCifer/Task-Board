import { useEffect, useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import confetti from "canvas-confetti"
import { useAuthStore } from "../store/authStore"
import { useBoardStore } from "../store/boardStore"
import { Task } from "../types/task"
import Column from "../components/board/Column"
import TaskCard from "../components/task/TaskCard"
import ActivityLog from "../components/board/ActivityLog"
import EditTaskDrawer from "../components/task/EditTaskDrawer"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)

  const {
    tasks,
    addTask,
    loadTasks,
    resetBoard,
    undo,
    exportBoard,
  } = useBoardStore()

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [collapsed, setCollapsed] = useState({
    todo: false,
    doing: false,
    done: false,
  })

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  )

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  })

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const handleAdd = () => {
    if (!form.title.trim()) return

    addTask({
      title: form.title.trim(),
      description: form.description,
      priority: form.priority as "Low" | "Medium" | "High",
      dueDate: form.dueDate,
    })

    setForm({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
    })
  }

  const handleReset = () => {
    if (window.confirm("Reset entire board?")) {
      resetBoard()
    }
  }

  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    })
  }

  const todoTasks = tasks.filter((t) => t.column === "todo")
  const doingTasks = tasks.filter((t) => t.column === "doing")
  const doneTasks = tasks.filter((t) => t.column === "done")

  return (
    <LayoutGroup>
      <motion.div
        layout
        className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
      >
        {/* HEADER */}
        <motion.div
          layout
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-xl"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Task Board</h1>

            <div className="flex gap-3 items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="px-4 py-2 bg-white/20 rounded-lg"
              >
                ☰
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 bg-white/20 rounded-lg"
              >
                {darkMode ? "☀" : "🌙"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={undo}
                className="px-4 py-2 bg-blue-500 rounded-lg"
              >
                Undo
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportBoard}
                className="px-4 py-2 bg-emerald-500 rounded-lg"
              >
                Export
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="px-4 py-2 bg-amber-500 rounded-lg"
              >
                Reset
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-4 py-2 bg-red-500 rounded-lg"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="flex">
          {/* SIDEBAR */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-64 bg-slate-900 border-r border-slate-800 p-6"
              >
                <h2 className="text-lg mb-4">Menu</h2>
                <p className="text-sm text-slate-400">
                  Phase 3 Activated 😈
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="flex-1 p-10">
            {/* CREATE TASK */}
            <motion.div layout className="mb-10 bg-slate-900/60 p-8 rounded-2xl">
              <h3 className="mb-6">Create Task</h3>

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full mb-4 p-3 bg-slate-800 rounded-lg"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full mb-4 p-3 bg-slate-800 rounded-lg"
              />

              <div className="flex gap-4">
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                  className="p-3 bg-slate-800 rounded-lg"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  className="p-3 bg-slate-800 rounded-lg"
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="px-6 py-3 bg-indigo-600 rounded-lg"
                >
                  Add Task
                </motion.button>
              </div>
            </motion.div>

            {/* BOARD */}
            <motion.div layout className="grid md:grid-cols-3 gap-8">
              <Column
                title="Todo"
                columnId="todo"
                count={todoTasks.length}
                collapsed={collapsed.todo}
                onToggle={() =>
                  setCollapsed({ ...collapsed, todo: !collapsed.todo })
                }
              >
                <AnimatePresence>
                  {!collapsed.todo &&
                    todoTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => setSelectedTask(task)}
                      />
                    ))}
                </AnimatePresence>
              </Column>

              <Column
                title="Doing"
                columnId="doing"
                count={doingTasks.length}
                collapsed={collapsed.doing}
                onToggle={() =>
                  setCollapsed({ ...collapsed, doing: !collapsed.doing })
                }
              >
                <AnimatePresence>
                  {!collapsed.doing &&
                    doingTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => setSelectedTask(task)}
                      />
                    ))}
                </AnimatePresence>
              </Column>

              <Column
                title="Done"
                columnId="done"
                count={doneTasks.length}
                collapsed={collapsed.done}
                onToggle={() =>
                  setCollapsed({ ...collapsed, done: !collapsed.done })
                }
              >
                <AnimatePresence>
                  {!collapsed.done &&
                    doneTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => {
                          handleConfetti()
                          setSelectedTask(task)
                        }}
                      />
                    ))}
                </AnimatePresence>
              </Column>
            </motion.div>

            <ActivityLog />
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedTask && (
            <EditTaskDrawer
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  )
}

export default BoardPage
