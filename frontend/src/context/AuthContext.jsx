import { createContext, useContext, useState, useEffect } from 'react'

// Create Auth Context
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token,setToken]=useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Load user from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    const token = localStorage.getItem("authToken")
    if(token){
      setToken(token)
    }
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      // Optional: You can add logic to verify if the session is still valid (e.g. JWT expiration check)
      console.log(savedUser);
      setUser(parsedUser)
    }
  }, [])

  // Check for existing user session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, we'd check with the backend
        // const response = await fetch('/api/auth/me');
        // if (response.ok) {
        //   const userData = await response.json();
        //   setUser(userData);
        // }

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
  const login = async (userData) => {
    // In a real app, we'd authenticate with the backend
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData)
    // });
    // if (response.ok) {
    //   const user = await response.json();
    //   setUser(user);
    //   return user;
    // }

    // For demo purposes
    const mockUser = {
      id: '123',
      name: userData.email.split('@')[0],
      email: userData.email,
      isAdmin: userData.email.includes('admin') // Simple admin check for demo
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };
  
  // Function to logout user
  const logout = async () => {
    // In a real app, we'd logout with the backend
    // await fetch('/api/auth/logout');
    
    // For demo purposes
    setUser(null);
    localStorage.removeItem('user');
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
