import { useAuthStore } from "../store/authStore"
import Column from "../components/board/Column"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)

  return (
    <div style={{ padding: "20px" }}>
      {}
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

      {}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <Column title="Todo">
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No tasks yet
          </p>
        </Column>

        <Column title="Doing">
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No tasks yet
          </p>
        </Column>

        <Column title="Done">
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No tasks yet
          </p>
        </Column>
      </div>
    </div>
  )
}

export default BoardPage
