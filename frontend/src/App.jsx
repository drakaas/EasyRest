import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
// import Menu from './pages/Menu/Menu'
// import About from './pages/About/About'
// import Contact from './pages/Contact/Contact'
// import Cart from './pages/Cart/Cart'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import LoginModal from './components/auth/LoginModal'
import Auth from './components/auth/AuthSuccess'
import Cart from './pages/Cart/CartPage'
import AuthSuccess from './components/auth/AuthSuccess'
import { CategoryProvider } from './context/CategoryContext'
export default function App() {
  return (
<AuthProvider>
        <CategoryProvider> {/* Add CategoryProvider here */}
      <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
              </Routes>
            </Layout>
            <LoginModal />
          </Router>
      </CartProvider>
        </CategoryProvider>
    </AuthProvider>
  )
}