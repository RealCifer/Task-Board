import { useBoardStore } from "../../store/boardStore"

function ActivityLog() {
  const activity = useBoardStore((state) => state.activity)

  const getTypeStyle = (message: string) => {
    if (message.toLowerCase().includes("created")) {
      return {
        icon: "🟢",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
      }
    }

    if (message.toLowerCase().includes("deleted")) {
      return {
        icon: "🔴",
        color: "text-red-400",
        bg: "bg-red-500/10 border-red-500/20",
      }
    }

    if (message.toLowerCase().includes("moved")) {
      return {
        icon: "🔵",
        color: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/20",
      }
    }

    return {
      icon: "⚪",
      color: "text-slate-400",
      bg: "bg-slate-500/10 border-slate-500/20",
    }
  }

  return (
    <div className="mt-16 bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl">

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
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700">
          {activity
            .slice()
            .reverse()
            .map((item) => {
              const style = getTypeStyle(item.message)

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border ${style.bg} transition hover:scale-[1.02] hover:bg-slate-800/60`}
                >
                  <div className="flex items-center gap-3">
                    <span>{style.icon}</span>
                    <span className={`text-sm ${style.color}`}>
                      {item.message}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500">
                    {new Date(item.timestamp || Date.now()).toLocaleTimeString()}
                  </span>
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default ActivityLog
