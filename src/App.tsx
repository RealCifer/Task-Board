import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import BoardPage from "./pages/BoardPage"
import ProtectedRoute from "./routes/ProtectedRoute"

function App() {
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
