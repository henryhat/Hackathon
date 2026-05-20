import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Demo user — in a real app this comes from a backend / JWT
const DEMO_USER = {
  id: "u1",
  name: "Demo Collector",
  email: "bhdadmin@gmail.com",
  avatar:
    "https://images.unsplash.com/photo-1778517436072-17faa6f57ca7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzd8fHxlbnwwfHx8fHw%3D",
  balance: 12000000, // ₦12M demo wallet
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore session from localStorage
    try {
      const saved = localStorage.getItem('ambassador_user')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Demo: any email/password logs in as demo user
    const u = { ...DEMO_USER, email }
    setUser(u)
    localStorage.setItem('ambassador_user', JSON.stringify(u))
    return true
  }

  const register = (data) => {
    const u = { ...DEMO_USER, ...data }
    setUser(u)
    localStorage.setItem('ambassador_user', JSON.stringify(u))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ambassador_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
