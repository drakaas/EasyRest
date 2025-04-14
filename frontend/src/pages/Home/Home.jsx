import { useState, useEffect } from 'react';
import FoodCategoryNav from '../../components/ui/FoodCategoryNav';
import MenuSection from './components/MenuSection';

export default function Home() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('/product/allProducts'); // Your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

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