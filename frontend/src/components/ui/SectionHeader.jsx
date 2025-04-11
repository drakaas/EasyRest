import React from 'react'

export default function SectionHeader({ icon, title, color = 'gray' }) {
  return (
    <div className="flex items-center mb-4">
      <div className={`bg-${color}-100 p-2 rounded-full mr-3`}>
        <span className={`material-symbols-outlined text-${color}-600`}>
          {icon}
        </span>
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  )
}