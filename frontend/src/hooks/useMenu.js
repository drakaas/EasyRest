import { useState, useEffect } from 'react'
import { menuData } from '../data/menuData'

export function useMenu() {
  const [menu, setMenu] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call
    const fetchMenu = async () => {
      try {
        // In a real app, you would fetch from an API
        setMenu(menuData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  return { menu, loading, error }
}