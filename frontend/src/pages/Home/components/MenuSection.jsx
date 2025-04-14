import SectionHeader from '../../../components/ui/SectionHeader'
import FoodItemCard from '../../../components/ui/FoodItemCard'
import { useCategories } from '../../../context/CategoryContext';


export default function MenuSection({ category, items }) {
  const { getCategoryMeta } = useCategories();
  const { icon, color } = getCategoryMeta(category);

  return (
    <section id={category.toLowerCase()} className="mb-10">
      <SectionHeader 
        icon={icon}
        title={category}
        color={color}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <FoodItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}