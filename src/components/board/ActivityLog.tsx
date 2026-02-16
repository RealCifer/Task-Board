import { useBoardStore } from "../../store/boardStore"

function ActivityLog() {
  const activity = useBoardStore((state) => state.activity)

  return (
    <div
      style={{
        marginTop: "50px",
        background: "white",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "15px", fontWeight: 600 }}>
        Activity Log
      </h3>

      {activity.length === 0 ? (
        <p style={{ fontSize: "13px", color: "#9ca3af" }}>
          No activity yet
        </p>
      ) : (
        activity
          .slice()
          .reverse()
          .map((item) => (
            <div
              key={item.id}
              style={{
                fontSize: "13px",
                marginBottom: "10px",
                padding: "8px 12px",
                background: "#f9fafb",
                borderRadius: "8px",
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
