import { createContext, useContext, useState, useEffect } from 'react'

// Create Auth Context
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Load user from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('authToken')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      // Optional: You can add logic to verify if the session is still valid (e.g. JWT expiration check)
      console.log(savedUser);
      setUser(parsedUser)
    }
  }, [])

  // Function to login user
  const login = (userData, token, rememberMe = false) => {
    setUser(userData);
    setShowLoginModal(false);
    console.log(userData)
    console.log(token)
    // // Save user data and token in localStorage if rememberMe is true
    // if (rememberMe) {
      localStorage.setItem('authUser', JSON.stringify(userData));
      localStorage.setItem('authToken', token); // Save the token
    // } else {
    //   localStorage.removeItem('authUser');
    //   localStorage.removeItem('authToken');
    // }
  };
  
  // Function to logout user
  const logout = () => {
    setUser(null)
      localStorage.removeItem('authUser');
      localStorage.removeItem('authToken');
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
