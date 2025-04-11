import React from 'react'
import FoodCategoryNav from '../../components/ui/FoodCategoryNav'
import MenuSection from '../Home/components/MenuSection'
import { menuData } from '../../data/menuData'

export default function Menu() {
  return (
    <div className="w-[1200px] bg-white mx-auto">
      <FoodCategoryNav />
      
      <main className="p-8 bg-neutral-50">
        {Object.entries(menuData).map(([category, items]) => (
          <MenuSection 
            key={category}
            category={category}
            items={items}
          />
        ))}
      </main>
    </div>
  )
}