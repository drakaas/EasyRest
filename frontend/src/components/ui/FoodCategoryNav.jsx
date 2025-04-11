import React from 'react'
import { NavLink } from 'react-router-dom'

const categories = [
  { name: 'Pizza', icon: 'local_pizza', color: 'red' },
  { name: 'Burgers', icon: 'lunch_dining', color: 'amber' },
  { name: 'Sides', icon: 'restaurant', color: 'green' },
  { name: 'Drinks', icon: 'local_bar', color: 'blue' },
  { name: 'Desserts', icon: 'cake', color: 'purple' },
  { name: 'Specials', icon: 'star', color: 'pink' }
]

export default function FoodCategoryNav() {
  return (
    <div className="p-6 sticky top-0 bg-white border-b border-neutral-200 z-10">
      <nav className="flex justify-between overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <NavLink 
            key={category.name}
            to={`/menu#${category.name.toLowerCase()}`}
            className={({isActive}) => `
              flex flex-col items-center p-3 min-w-[80px] rounded-lg
              ${isActive ? 'bg-neutral-100' : 'hover:bg-neutral-50'} transition-colors
            `}
          >
            <div className={`bg-${category.color}-100 p-2 rounded-full`}>
              <span className={`material-symbols-outlined text-${category.color}-600`}>
                {category.icon}
              </span>
            </div>
            <span className="mt-1 text-sm font-medium">{category.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}