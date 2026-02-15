import { useAuthStore } from "../store/authStore"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)

  const columns = [
    { id: "todo", title: "Todo" },
    { id: "doing", title: "Doing" },
    { id: "done", title: "Done" },
  ]

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Task Board</h1>
        <button
          onClick={logout}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      {/* Board Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {columns.map((column) => (
          <div
            key={column.id}
            style={{
              background: "#f9fafb",
              padding: "15px",
              borderRadius: "10px",
              minHeight: "400px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{column.title}</h3>

            <div
              style={{
                flex: 1,
                borderRadius: "8px",
                border: "2px dashed #e5e7eb",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#9ca3af",
                fontSize: "14px",
              }}
            >
              No tasks yet
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardPage
