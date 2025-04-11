import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function UserDropdown() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <span className="text-sm font-medium">{user.name}</span>
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary-600">account_circle</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <span className="material-symbols-outlined mr-2 text-gray-500">account_circle</span>
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <span className="material-symbols-outlined mr-2 text-gray-500">settings</span>
            Settings
          </a>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <span className="material-symbols-outlined mr-2 text-gray-500">logout</span>
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}