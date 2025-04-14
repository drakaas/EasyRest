import { useFetch } from '../../hooks/useFetch';
import FoodCategoryNav from '../../components/ui/FoodCategoryNav';
import MenuSection from './components/MenuSection';

export default function Home() {
  const { data: menuData, loading, error } = useFetch('/product/allProducts');

  // Transform the flat array into categorized data structure
  const transformData = (data) => {
    if (!data) return {};
    
    return data.reduce((acc, item) => {
      const category = item.slug; // Using slug as category key
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  const categorizedData = transformData(menuData);

  if (loading) {
    return <div className="text-center p-8">Loading menu...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-[1200px] bg-white mx-auto">
      <FoodCategoryNav />
      
      <main className="p-8 bg-neutral-50">
        {Object.entries(categorizedData).map(([category, items]) => (
          <MenuSection 
            key={category}
            category={category}
            items={items}
          />
        ))}
      </main>
    </div>
  );
}