import { useAuthStore } from "../store/authStore"

function BoardPage() {
  const logout = useAuthStore((state) => state.logout)

  return (
    <div style={{ padding: 40 }}>
      <h2>Board Page</h2>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default BoardPage
