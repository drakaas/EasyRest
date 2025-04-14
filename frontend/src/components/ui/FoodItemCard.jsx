import React from 'react'
import RatingBadge from './RatingBadge'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const FoodItemCard = React.memo(({ item }) => {
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { name, price, description, rating, reviewCount, images, tags, id } = item
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="h-48 bg-neutral-200 relative overflow-hidden">
        <img src={`127.0.0.1:5000/images/${images[0]}`} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
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
          {user ? (
            <button 
              onClick={() => addToCart({ ...item, quantity: 1 })}
              className="bg-primary-600 hover:bg-primary-700 text-black px-4 py-2 rounded-lg text-sm font-medium  border border-black  transition-colors flex items-center"
            >
              <span className="material-symbols-outlined text-sm mr-1">add_shopping_cart</span>
              Add to cart
            </button>
          ) : (
            <button 
              onClick={() => alert('Please login to add items to cart')}
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-sm mr-1">lock</span>
              Login to order
            </button>
          )}
        </div>
      </div>
    </div>
  )
})

FoodItemCard.displayName = 'FoodItemCard'
export default FoodItemCard