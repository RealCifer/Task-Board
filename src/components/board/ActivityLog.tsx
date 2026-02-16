import { useBoardStore } from "../../store/boardStore"

function ActivityLog() {
  const activity = useBoardStore((state) => state.activity)

  return (
    <div
      style={{
        marginTop: "60px",
        background: "white",
        padding: "28px",
        borderRadius: "18px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
      }}
    >
      <h3 style={{ marginBottom: "20px", fontWeight: 600 }}>
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
                padding: "10px 14px",
                background: "#f9fafb",
                borderRadius: "10px",
                fontSize: "13px",
                marginBottom: "10px",
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
