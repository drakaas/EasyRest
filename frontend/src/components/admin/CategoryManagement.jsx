import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';

const CATEGORY_ICONS = {
  Pizza: { icon: "local_pizza", color: "red" },
  Burgers: { icon: "lunch_dining", color: "yellow" },
  Sides: { icon: "restaurant", color: "green" },
  Drinks: { icon: "local_bar", color: "blue" },
  Desserts: { icon: "cake", color: "purple" },
  Specials: { icon: "star", color: "pink" }
};

export default function CategoryManagement() {
  const { categories, addCategory, updateCategory, deleteCategory, reorderCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    addCategory({
      name: newCategoryName,
      icon: "category", // Default icon
      color: "gray" // Default color
    });
    
    setNewCategoryName('');
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      updateCategory(editingCategory.id, editingCategory);
      setEditingCategory(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4">Product Categories</h3>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <input 
            type="text" 
            placeholder="Add new category" 
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <button 
            className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
        <div className="text-sm text-gray-500 mb-4">Drag and drop to reorder categories</div>
      </div>
      
      <div className="space-y-2">
        {/* Category items */}
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-400 cursor-move">drag_indicator</span>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-${category.color || 'gray'}-500`}>
                  {category.icon || 'category'}
                </span>
                <span>{category.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => handleEditCategory(category)}
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button 
                className="text-gray-500 hover:text-red-500 transition-colors"
                onClick={() => deleteCategory(category.id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Category Modal - We'd implement this with a proper modal component */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-medium mb-4">Edit Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Icon</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={editingCategory.icon}
                  onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                >
                  <option value="local_pizza">Pizza</option>
                  <option value="lunch_dining">Burger</option>
                  <option value="restaurant">Sides</option>
                  <option value="local_bar">Drinks</option>
                  <option value="cake">Dessert</option>
                  <option value="star">Special</option>
                  <option value="category">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Color</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={editingCategory.color}
                  onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                >
                  <option value="red">Red</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                  <option value="pink">Pink</option>
                  <option value="gray">Gray</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button 
                  className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button 
                  className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  onClick={handleUpdateCategory}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 