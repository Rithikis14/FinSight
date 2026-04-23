import { createContext, useContext, useState, useCallback } from 'react'
import { authApi } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fs_user')) } catch { return null }
  })

  const login = useCallback(async (email, password) => {
    const { data } = await authApi.login({ email, password })
    localStorage.setItem('fs_token', data.token)
    localStorage.setItem('fs_user', JSON.stringify({ email: data.email, fullName: data.fullName }))
    setUser({ email: data.email, fullName: data.fullName })
    return data
  }, [])

  const register = useCallback(async (fullName, email, password) => {
    const { data } = await authApi.register({ fullName, email, password })
    localStorage.setItem('fs_token', data.token)
    localStorage.setItem('fs_user', JSON.stringify({ email: data.email, fullName: data.fullName }))
    setUser({ email: data.email, fullName: data.fullName })
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('fs_token')
    localStorage.removeItem('fs_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
