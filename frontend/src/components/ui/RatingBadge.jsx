import React from 'react'

export default function RatingBadge({ rating, reviewCount }) {
  return (
    <div className="flex items-center">
      <span className="material-symbols-outlined text-amber-500">star</span>
      <span className="ml-1 text-sm font-medium">{rating}</span>
      <span className="ml-1 text-xs text-neutral-500">({reviewCount})</span>
    </div>
  )
}