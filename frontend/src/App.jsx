import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
// import Menu from './pages/Menu/Menu'
// import About from './pages/About/About'
// import Contact from './pages/Contact/Contact'
// import Cart from './pages/Cart/Cart'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginModal from './components/auth/LoginModal'
import Auth from './components/auth/AuthSuccess'
import Cart from './pages/Cart/CartPage'
import AdminPage from './pages/Admin/AdminPage'
import AuthSuccess from './components/auth/AuthSuccess'
import { CategoryProvider } from './context/CategoryContext'
import Users from './pages/Admin/Users'
import AdminLayout from './components/admin/AdminLayout'

// Protected Route component
const ProtectedRoute = ({ children, isAdmin }) => {
  const { user } = useAuth(); // You'll need to implement this hook
  if (!user || (isAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                
                {/* Admin Routes */}
                <Route path="/admin/*" element={
                  <ProtectedRoute isAdmin>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminPage />} />
                  <Route path="users" element={<Users />} />
                  {/* Add more admin routes here */}
                </Route>
              </Routes>
            </Layout>
            <LoginModal />
          </Router>
        </CartProvider>
      </CategoryProvider>
    </AuthProvider>
  )
}