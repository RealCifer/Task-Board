import { useEffect } from "react"
import { useAuthStore } from "./store/authStore"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import BoardPage from "./pages/BoardPage"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/board"
        element={
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
