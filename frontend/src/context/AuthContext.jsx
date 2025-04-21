import { createContext, useContext, useState, useEffect } from 'react'

// Create Auth Context
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
      setToken(authToken)
    }
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      // Optional: You can add logic to verify if the session is still valid (e.g. JWT expiration check)
      setUser(parsedUser)
    }
  }, [])

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // For demo, check localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Function to login user
  const login = async (userData, token = null, skipBackend = false) => {
    // Handle direct admin login case
    if (skipBackend) {
      const adminUser = {
        id: '5f8d3a7e4a7e3a1a7e3a7e3a',
        email: 'admin@example.com',
        username: 'admin',
        isAdmin: true,
        role: 'admin'
      };
      
      setUser(adminUser);
      setShowLoginModal(false);
      
      // Save to both storage locations for compatibility
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('authUser', JSON.stringify(adminUser));
      
      return adminUser;
    }
    
    // Normal login flow with backend data
    if (userData) {
      // Add admin flag based on role
      const userWithAdminFlag = {
        ...userData,
        isAdmin: userData.role === 'admin'
      };
      
      setUser(userWithAdminFlag);
      setShowLoginModal(false);
      
      if (token) {
        setToken(token);
        localStorage.setItem('authToken', token);
      }
      
      localStorage.setItem('authUser', JSON.stringify(userWithAdminFlag));
      localStorage.setItem('user', JSON.stringify(userWithAdminFlag));
      
      return userWithAdminFlag;
    }
    
    throw new Error('Invalid login data');
  };
  
  // Function to logout user
  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    showLoginModal,
    setShowLoginModal,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
