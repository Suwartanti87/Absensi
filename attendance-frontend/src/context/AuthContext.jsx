import { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authServise.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('absensi_user')
    const token = localStorage.getItem('absensi_token')
    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  async function login(username, password) {
    // TODO: saat backend sudah tersambung, authService.login akan memanggil
    // POST /auth/login (lihat src/services/authServise.js)
    const data = await authService.login(username, password)
    localStorage.setItem('absensi_token', data.token)
    localStorage.setItem('absensi_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  const value = { user, loading, login, logout, isAuthenticated: !!user }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}
