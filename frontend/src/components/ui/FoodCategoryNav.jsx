// components/FoodCategoryNav.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
// import { fetchCategories } from '../api/categoryService';

export default function FoodCategoryNav() {
  const { 
    data: categories, 
    loading, 
    error 
  } = useFetch('/products/categories');

  const scrollToCategory = (categorySlug) => {
    const element = document.getElementById(categorySlug);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <CategoryNavLoading />;
  if (error) return <CategoryNavError error={error} />;

  return (
    <div className="p-6 sticky top-0 bg-white border-b border-neutral-200 z-10">
      <nav className="flex justify-between overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <NavLink 
            key={category._id}
            to={`/menu#${category.slug}`}
            className={({isActive}) => `
              flex flex-col items-center p-3 min-w-[80px] rounded-lg
              ${isActive ? 'bg-neutral-100' : 'hover:bg-neutral-50'} transition-colors
            `}
            onClick={(e) => {
              e.preventDefault();
              scrollToCategory(category.slug);
              window.history.pushState(null, '', `#${category.slug}`);
            }}
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
  );
}

// Optional: Extract loading and error states to separate components
function CategoryNavLoading() {
  return (
    <div className="p-6 sticky top-0 bg-white border-b border-neutral-200 z-10">
      <div className="flex justify-center">
        <p>Loading categories...</p>
      </div>
    </div>
  );
}

function CategoryNavError({ error }) {
  return (
    <div className="p-6 sticky top-0 bg-white border-b border-neutral-200 z-10">
      <div className="flex justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    </div>
  );
}