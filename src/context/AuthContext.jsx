import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Demo user — in a real app this comes from a backend / JWT
const DEMO_USER = {
  id: 'u1',
  name: 'Demo Collector',
  email: 'demo@ambassador.art',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  balance: 12000000, // ₦12M demo wallet
}

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
