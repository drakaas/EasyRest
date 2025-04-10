import React from 'react'
import RatingBadge from './RatingBadge'
import { useCart } from '../../context/CartContext'

const FoodItemCard = React.memo(({ item }) => {
  const { addToCart } = useCart()
  const { name, price, description, rating, reviewCount, image, tags } = item
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-48 bg-neutral-200 relative overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
        {tags?.map(tag => (
          <span 
            key={tag.text}
            className={`absolute top-3 right-3 bg-${tag.color}-500 text-white px-2 py-1 rounded-full text-xs font-semibold`}
          >
            {tag.text}
          </span>
        ))}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{name}</h3>
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
        </div>
        <p className="text-neutral-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <RatingBadge rating={rating} reviewCount={reviewCount} />
          <button 
            onClick={() => addToCart(item)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <span className="material-symbols-outlined text-sm mr-1">add_shopping_cart</span>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
})

FoodItemCard.displayName = 'FoodItemCard'
export default FoodItemCard