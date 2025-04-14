// context/CategoryContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch'; // Import the useFetch hook

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  // Use the useFetch hook directly
  const { data: categories, loading, error } = useFetch('/product/categories');

  const getCategoryMeta = (categoryName) => {
    return categories?.find(cat => cat.name === categoryName) || {
      icon: 'restaurant',
      color: 'gray'
    };
  };

  return (
    <CategoryContext.Provider value={{ 
      categories: categories || [], 
      loading, 
      error, 
      getCategoryMeta 
    }}>
      {children}
    </CategoryContext.Provider>
  );
}