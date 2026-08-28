import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Bungkus route khusus HR_ADMIN. Kalau role bukan admin, tendang ke area karyawan.
export default function AdminRoute() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'ADMIN' && user.role !== 'HR_ADMIN') {
    return <Navigate to="/employee" replace />
  }
  return <Outlet />
}
