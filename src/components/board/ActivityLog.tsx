import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBoardStore } from "../../store/boardStore"

function ActivityLog() {
  const activity = useBoardStore((state) => state.activity)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }, [activity])

  const getTypeStyle = (message: string) => {
    const lower = message.toLowerCase()

    if (lower.includes("created")) {
      return {
        icon: "🟢",
        text: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
      }
    }

    if (lower.includes("deleted")) {
      return {
        icon: "🔴",
        text: "text-red-400",
        bg: "bg-red-500/10 border-red-500/20",
      }
    }

    if (lower.includes("moved")) {
      return {
        icon: "🔵",
        text: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
      }
    }

    if (lower.includes("updated")) {
      return {
        icon: "🟣",
        text: "text-purple-400",
        bg: "bg-purple-500/10 border-purple-500/20",
      }
    }

    return {
      icon: "⚪",
      text: "text-slate-400",
      bg: "bg-slate-500/10 border-slate-500/20",
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-200 tracking-tight">
          Activity Log
        </h3>

        <span className="text-xs text-slate-400">
          {activity.length} events
        </span>
      </div>

      {activity.length === 0 ? (
        <p className="text-slate-400 text-sm">
          No activity yet
        </p>
      ) : (
        <div
          ref={containerRef}
          className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        >
          <AnimatePresence>
            {activity
              .slice()
              .reverse()
              .map((item) => {
                const style = getTypeStyle(item.message)

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className={`relative flex items-center justify-between px-4 py-3 rounded-lg border ${style.bg} hover:scale-[1.02] transition`}
                  >
                    {}
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500"></span>

                    <div className="flex items-center gap-3">
                      <span>{style.icon}</span>

                      <span className={`text-sm ${style.text}`}>
                        {item.message}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}

export default ActivityLog
