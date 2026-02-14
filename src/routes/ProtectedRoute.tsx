import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

interface Props {
  children: React.ReactNode
}

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default ProtectedRoute
