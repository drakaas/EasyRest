import SectionHeader from '../../../components/ui/SectionHeader'
import FoodItemCard from '../../../components/ui/FoodItemCard'

const categoryIcons = {
  Pizza: 'local_pizza',
  Burgers: 'lunch_dining',
  Sides: 'restaurant',
  Drinks: 'local_bar',
  Desserts: 'cake',
  Specials: 'star'
}

const categoryColors = {
  Pizza: 'red',
  Burgers: 'amber',
  Sides: 'green',
  Drinks: 'blue',
  Desserts: 'purple',
  Specials: 'pink'
}

export default function MenuSection({ category, items }) {
  return (
    <section id={category.toLowerCase()} className="mb-10">
      <SectionHeader 
        icon={categoryIcons[category] || 'restaurant'}
        title={category}
        color={categoryColors[category] || 'gray'}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <FoodItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}