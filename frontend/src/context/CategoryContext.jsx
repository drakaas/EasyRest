// context/CategoryContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  // Use the useFetch hook to fetch categories from the backend
  const { data: categories, loading, error } = useFetch('/product/categories');

  // Memoizing the getCategoryMeta function to avoid unnecessary recalculations
  const getCategoryMeta = (categoryName) => {
    if (!categories) return { icon: 'restaurant', color: 'gray' }; // Fallback in case categories haven't loaded yet
    const category = categories.find((cat) => cat.name === categoryName);
    return category || { icon: 'restaurant', color: 'gray' }; // Default value if category is not found
  };

  // Return the context provider with all necessary values
  return (
    <CategoryContext.Provider value={{ categories, loading, error, getCategoryMeta }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
}
