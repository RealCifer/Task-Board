import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = localStorage.getItem("auth") === "true"

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default ProtectedRoute
