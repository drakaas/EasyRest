// CategoryContext.js
import { createContext, useContext } from 'react';

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  // Your context value here
  const value = {
    getCategoryMeta: (category) => {
      // Your implementation
      return { icon: 'default-icon', color: 'gray' };
    }
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

// Custom hook to use the context
export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
}