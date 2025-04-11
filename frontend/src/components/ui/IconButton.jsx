import React from 'react'

export default function IconButton({ icon, badgeCount = 0, onClick }) {
  return (
    <button 
      className="p-2 rounded-full hover:bg-neutral-100 transition-colors relative"
      onClick={onClick}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badgeCount}
        </span>
      )}
    </button>
  )
}