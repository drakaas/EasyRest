import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, token } = useAuth()
  
  // Debug function to log cart state
  const logCartState = (source, items) => {
    console.log(`[${source}] Cart state:`, items)
    console.log(`[${source}] Cart count:`, items.reduce((sum, item) => sum + item.quantity, 0))
  }
  
  // Fetch cart from the backend when user logs in
  useEffect(() => {
    if (!user || !token) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    console.log('User logged in, fetching cart...')
    fetchCartFromBackend()
  }, [user, token])
  
  // Fetch cart data from the backend
  const fetchCartFromBackend = async () => {
    try {
      console.log('Fetching cart from backend...')
      setLoading(true)
      const response = await fetch('http://localhost:5000/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include'
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to fetch cart:', errorText)
        throw new Error('Failed to fetch cart: ' + errorText)
      }
      
      const data = await response.json()
      console.log('Raw cart data from backend:', data)
      
      // Transform backend cart format to frontend format
      if (data && data.items && Array.isArray(data.items)) {
        console.log('Transforming cart items...')
        const transformedItems = data.items.map(item => {
          if (!item.product) {
            console.error('Malformed cart item from backend:', item)
            return null
          }
          
          console.log('Processing item:', item)
          return {
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            images: item.product.images,
            image: item.product.images && item.product.images.length > 0 
              ? item.product.images[0] 
              : null
          }
        }).filter(Boolean) // Remove any null items
        
        console.log('Transformed items:', transformedItems)
        setCartItems(transformedItems)
        logCartState('fetchCartFromBackend', transformedItems)
      } else {
        console.log('No items in cart data or invalid format:', data)
        setCartItems([])
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // Add item to cart - both locally and on the backend
  const addToCart = async (item) => {
    console.log('CartContext addToCart called with item:', item)
    
    // Get the correct ID (handle both MongoDB _id and regular id)
    const productId = item._id || item.id
    
    if (!productId) {
      console.error('Missing product ID, cannot add to cart:', item)
      return
    }
    
    if (user && token) {
      try {
        console.log('Adding to backend with productId:', productId)
        // Add to backend
        const response = await fetch('http://localhost:5000/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: productId,
            quantity: item.quantity || 1
          }),
          credentials: 'include'
        })
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('Backend error:', errorText)
          throw new Error('Failed to add item to cart: ' + errorText)
        }
        
        console.log('Successfully added to backend, fetching updated cart...')
        // Refetch the cart to get the updated state from backend
        await fetchCartFromBackend()
      } catch (error) {
        console.error('Error adding to cart:', error)
      }
    } else {
      // If not logged in, just update local state
      console.log('User not logged in, updating local cart state...')
      setCartItems(prev => {
        const existingItem = prev.find(cartItem => cartItem.id === productId)
        if (existingItem) {
          console.log('Item already in cart, updating quantity...')
          const updatedItems = prev.map(cartItem =>
            cartItem.id === productId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
          logCartState('addToCart (update)', updatedItems)
          return updatedItems
        }
        console.log('Item not in cart, adding as new...')
        const newItem = { 
          ...item, 
          id: productId, 
          quantity: item.quantity || 1 
        }
        const updatedItems = [...prev, newItem]
        logCartState('addToCart (new)', updatedItems)
        return updatedItems
      })
    }
  }

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    console.log('Removing item from cart:', itemId)
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
          const errorText = await response.text()
          console.error('Failed to remove item:', errorText)
          throw new Error('Failed to remove item from cart: ' + errorText)
        }
        
        console.log('Successfully removed from backend, fetching updated cart...')
        // Refetch the cart to get the updated state
        await fetchCartFromBackend()
      } catch (error) {
        console.error('Error removing from cart:', error)
      }
    } else {
      // If not logged in, just update local state
      console.log('User not logged in, updating local cart state...')
      setCartItems(prev => {
        const updatedItems = prev.filter(item => item.id !== itemId)
        logCartState('removeFromCart', updatedItems)
        return updatedItems
      })
    }
  }

  // Update item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    console.log('Updating quantity for item:', itemId, 'to', newQuantity)
    if (newQuantity < 1) {
      removeFromCart(itemId)
      return
    }
    
    // Optimistically update the UI first
    setCartItems(prev => {
      const updatedItems = prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
      logCartState('updateQuantity (optimistic)', updatedItems)
      return updatedItems
    })
    
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
          const errorText = await response.text()
          console.error('Failed to update item:', errorText)
          // Revert to previous state on error
          fetchCartFromBackend()
          throw new Error('Failed to update cart item: ' + errorText)
        }
        
        // No need to refetch the entire cart since we already updated optimistically
        console.log('Successfully updated in backend')
      } catch (error) {
        console.error('Error updating cart:', error)
        // On error, revert to the server state
        fetchCartFromBackend()
      }
    }
    // No else needed since we already optimistically updated the cart for both cases
  }

  // Clear the entire cart
  const clearCart = async () => {
    console.log('Clearing cart...')
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
          const errorText = await response.text()
          console.error('Failed to clear cart:', errorText)
          throw new Error('Failed to clear cart: ' + errorText)
        }
        
        console.log('Successfully cleared in backend, updating local state...')
        // Clear local state
        setCartItems([])
      } catch (error) {
        console.error('Error clearing cart:', error)
      }
    } else {
      // If not logged in, just clear local state
      console.log('User not logged in, clearing local cart state...')
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