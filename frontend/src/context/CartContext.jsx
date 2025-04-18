import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, token } = useAuth()
  
  // Fetch cart from the backend when user logs in
  useEffect(() => {
    if (user && token) {
      fetchCartFromBackend()
    } else {
      // Clear cart when user logs out
      setCartItems([])
    }
  }, [user, token])
  
  // Fetch cart data from the backend
  const fetchCartFromBackend = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }
      
      const data = await response.json()
      
      // Transform backend cart format to frontend format
      if (data && data.items && Array.isArray(data.items)) {
        const transformedItems = data.items.map(item => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          images: item.product.images,
          image: item.product.images && item.product.images.length > 0 
            ? item.product.images[0] 
            : null
        }))
        setCartItems(transformedItems)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Add item to cart - both locally and on the backend
  const addToCart = async (item) => {
    if (user && token) {
      try {
        // Add to backend
        const response = await fetch('http://localhost:5000/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.id,
            quantity: 1
          }),
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Failed to add item to cart')
        }
        
        // Refetch the cart to get the updated state from backend
        await fetchCartFromBackend()
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    } else {
      // If not logged in, just update local state
      setCartItems(prev => {
        const existingItem = prev.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          return prev.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        }
        return [...prev, { ...item, quantity: 1 }]
      })
    }
  }

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (user && token) {
      try {
        const response = await fetch(`http://localhost:5000/cart/remove/${itemId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Failed to remove item from cart')
        }
        
        // Refetch the cart to get the updated state
        await fetchCartFromBackend()
      } catch (error) {
        console.error('Error removing from cart:', error)
      }
    } else {
      // If not logged in, just update local state
      setCartItems(prev => prev.filter(item => item.id !== itemId))
    }
  }

  // Update item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }
    
    if (user && token) {
      try {
        const response = await fetch('http://localhost:5000/cart/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: itemId,
            quantity: newQuantity
          }),
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Failed to update cart item')
        }
        
        // Refetch the cart to get the updated state
        await fetchCartFromBackend()
      } catch (error) {
        console.error('Error updating cart:', error)
      }
    } else {
      // If not logged in, just update local state
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  // Clear the entire cart
  const clearCart = async () => {
    if (user && token) {
      try {
        const response = await fetch('http://localhost:5000/cart/clear', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include'
        })
        
        if (!response.ok) {
          throw new Error('Failed to clear cart')
        }
        
        // Clear local state
        setCartItems([])
      } catch (error) {
        console.error('Error clearing cart:', error)
      }
    } else {
      // If not logged in, just clear local state
      setCartItems([])
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartCount,
        cartTotal,
        loading,
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        refreshCart: fetchCartFromBackend
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}