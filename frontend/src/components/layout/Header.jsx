import { NavLink } from 'react-router-dom'
import IconButton from '../ui/IconButton'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import UserDropdown from '../ui/UserDropDown'


export default function Header() {
  const { cartCount } = useCart()
  const { user, setShowLoginModal } = useAuth()
  const handleCartClick = () => {
    if (!user) {
      setShowLoginModal(true)
      return false
    }
    return true
  }

  return (
    <header className="py-6 px-8 bg-neutral-50 border-b border-neutral-200 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <svg className="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V6c0-2.21-1.79-4-4-4s-4 1.79-4 4v8h2.5V6c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/>
        </svg>
        <h1 className="text-2xl font-bold">FoodBay</h1>
      </div>
      
      <nav className="hidden md:flex space-x-6">
        <NavLink to="/" className={({isActive}) => `font-medium ${isActive ? 'text-primary-600' : 'hover:text-primary-600'} transition-colors`}>
          Home
        </NavLink>
        <NavLink to="/menu" className={({isActive}) => `font-medium ${isActive ? 'text-primary-600' : 'hover:text-primary-600'} transition-colors`}>
          Menu
        </NavLink>
        <NavLink to="/about" className={({isActive}) => `font-medium ${isActive ? 'text-primary-600' : 'hover:text-primary-600'} transition-colors`}>
          About
        </NavLink>
        <NavLink to="/contact" className={({isActive}) => `font-medium ${isActive ? 'text-primary-600' : 'hover:text-primary-600'} transition-colors`}>
          Contact
        </NavLink>
      </nav>
      
      <div className="flex items-center space-x-4">
        <IconButton icon="search" />
        <NavLink 
          to="/cart" 
          onClick={(e) => !handleCartClick() && e.preventDefault()}
          className={({isActive}) => isActive ? 'text-primary-600' : ''}
        >
          <IconButton icon="shopping_cart" badgeCount={cartCount} />
        </NavLink>
        {user ? (
          <UserDropdown />
        ) : (
          <button 
            onClick={() => setShowLoginModal(true)}
            className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <span className="material-symbols-outlined">person</span>
          </button>
        )}
      </div>
    </header>
  )
}