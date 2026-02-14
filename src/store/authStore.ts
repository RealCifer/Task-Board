import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  login: (email: string, password: string, remember: boolean) => string | null
  logout: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,

  initialize: () => {
    const stored = localStorage.getItem("auth")
    if (stored === "true") {
      set({ isAuthenticated: true })
    }
  },

  login: (email, password, remember) => {
    if (email !== "intern@demo.com" || password !== "intern123") {
      return "Invalid email or password"
    }

    if (remember) {
      localStorage.setItem("auth", "true")
    }

    set({ isAuthenticated: true })
    return null
  },

  logout: () => {
    localStorage.removeItem("auth")
    set({ isAuthenticated: false })
  },
}))
