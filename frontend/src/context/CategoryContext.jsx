// context/CategoryContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCategories } from '../data/CategoryService';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const getCategoryMeta = (categoryName) => {
    return categories.find(cat => cat.name === categoryName) || {
      icon: 'restaurant',
      color: 'gray'
    };
  };

  return (
    <CategoryContext.Provider value={{ categories, loading, error, getCategoryMeta }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoryContext);
}