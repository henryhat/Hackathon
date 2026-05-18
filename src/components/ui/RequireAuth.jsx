import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth({ children }) {
  const { isLoggedIn, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  if (!isLoggedIn) {
    // Save where they were trying to go, so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
