import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const login = (userData) => {
    setUser(userData)
    setShowLoginModal(false)
    // In a real app, you would save to localStorage if rememberMe is true
  }

  const logout = () => {
    setUser(null)
    // In a real app, you would clear localStorage/sessionStorage
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      showLoginModal, 
      setShowLoginModal, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}