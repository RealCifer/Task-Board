import { useBoardStore } from "../../store/boardStore"

function ActivityLog() {
  const activity = useBoardStore((state) => state.activity)

  return (
    <div
      style={{
        marginTop: "40px",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>Activity Log</h3>

      {activity.length === 0 ? (
        <p style={{ fontSize: "13px", color: "#9ca3af" }}>
          No activity yet
        </p>
      ) : (
        activity.map((item) => (
          <div
            key={item.id}
            style={{
              fontSize: "13px",
              marginBottom: "8px",
              color: "#374151",
            }}
          >
            {item.message}
          </div>
        ))
      )}
    </div>
  )
}

export default ActivityLog
