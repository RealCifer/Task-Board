import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

function LoginPage() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuthStore()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/board")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = login(email.trim(), password.trim(), remember)

    if (result) {
      setError(result)
      return
    }

    setError(null)
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f6f8",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Task Board Login</h2>

        <p style={{ fontSize: "13px", textAlign: "center", color: "#666" }}>
          Demo credentials: intern@demo.com / intern123
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(null)
          }}
          required
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        <label style={{ fontSize: "14px" }}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Remember me
        </label>

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
        )}

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
            transition: "0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "#4338ca")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = "#4f46e5")
          }
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
