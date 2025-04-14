import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Load user from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (userData, rememberMe = false) => {
    setUser(userData)
    setShowLoginModal(false)
    if (rememberMe) {
      localStorage.setItem('authUser', JSON.stringify(userData))
    } else {
      localStorage.removeItem('authUser')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
