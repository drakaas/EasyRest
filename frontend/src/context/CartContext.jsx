import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    setCartItems(prev => {
      // Check if item already exists in cart
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        // If exists, increase quantity
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        )
      }
      // If new item, add to cart with quantity 1
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartCount,
        cartTotal,
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart 
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