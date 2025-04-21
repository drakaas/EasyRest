import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

// Mock categories for demo (would use API in real app)
const initialCategories = [
  { id: '1', name: 'Pizza', icon: 'local_pizza', color: 'red' },
  { id: '2', name: 'Burgers', icon: 'lunch_dining', color: 'yellow' },
  { id: '3', name: 'Sides', icon: 'restaurant', color: 'green' },
  { id: '4', name: 'Drinks', icon: 'local_bar', color: 'blue' },
  { id: '5', name: 'Desserts', icon: 'cake', color: 'purple' },
  { id: '6', name: 'Specials', icon: 'star', color: 'pink' }
];

export function useCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, fetch from API
      // const response = await fetch('/api/categories');
      // const data = await response.json();
      
      // Using mock data for demonstration
      setTimeout(() => {
        setCategories(initialCategories);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
      setLoading(false);
    }
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = useCallback(async (categoryData) => {
    try {
      // In a real app, post to API
      // const response = await fetch('/api/categories', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(categoryData)
      // });
      // const newCategory = await response.json();
      
      // Using mock for demonstration
      const newCategory = {
        id: Date.now().toString(),
        ...categoryData
      };
      
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      console.error('Error adding category:', err);
      throw new Error('Failed to add category');
    }
  }, []);

  const updateCategory = useCallback(async (id, categoryData) => {
    try {
      // In a real app, put to API
      // const response = await fetch(`/api/categories/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(categoryData)
      // });
      // const updatedCategory = await response.json();
      
      // Using mock for demonstration
      setCategories(prev => 
        prev.map(category => 
          category.id === id ? { ...category, ...categoryData } : category
        )
      );
      
      return categoryData;
    } catch (err) {
      console.error('Error updating category:', err);
      throw new Error('Failed to update category');
    }
  }, []);

  const deleteCategory = useCallback(async (id) => {
    try {
      // In a real app, delete from API
      // await fetch(`/api/categories/${id}`, {
      //   method: 'DELETE'
      // });
      
      // Using mock for demonstration
      setCategories(prev => prev.filter(category => category.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
      throw new Error('Failed to delete category');
    }
  }, []);

  const reorderCategories = useCallback(async (orderedIds) => {
    try {
      // In a real app, put to API
      // await fetch('/api/categories/reorder', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ orderedIds })
      // });
      
      // Using mock for demonstration
      const categoryMap = {};
      categories.forEach(category => {
        categoryMap[category.id] = category;
      });
      
      const reordered = orderedIds.map(id => categoryMap[id]);
      
      setCategories(reordered);
    } catch (err) {
      console.error('Error reordering categories:', err);
      throw new Error('Failed to reorder categories');
    }
  }, [categories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories
  };
} 