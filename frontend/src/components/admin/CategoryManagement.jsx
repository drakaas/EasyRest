import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';

// Common food-related Material Icons
const AVAILABLE_ICONS = [
  { name: "Pizza", icon: "local_pizza" },
  { name: "Burger", icon: "lunch_dining" },
  { name: "Restaurant", icon: "restaurant" },
  { name: "Drinks", icon: "local_bar" },
  { name: "Dessert", icon: "cake" },
  { name: "Special", icon: "star" },
  { name: "Fast Food", icon: "fastfood" },
  { name: "Ice Cream", icon: "icecream" },
  { name: "Coffee", icon: "coffee" },
  { name: "Bakery", icon: "bakery_dining" },
  { name: "Sushi", icon: "set_meal" },
  { name: "Salad", icon: "nutrition" },
  { name: "Wine", icon: "wine_bar" },
  { name: "Pasta", icon: "dinner_dining" },
  { name: "Breakfast", icon: "breakfast_dining" }
];

const AVAILABLE_COLORS = [
  { name: "Red", value: "red" },
  { name: "Yellow", value: "amber" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
  { name: "Purple", value: "purple" },
  { name: "Pink", value: "pink" },
  { name: "Orange", value: "orange" },
  { name: "Teal", value: "teal" },
  { name: "Indigo", value: "indigo" },
  { name: "Gray", value: "gray" }
];

// Map color names to their Tailwind equivalents
const COLOR_MAP = {
  red: 'red',
  amber: 'amber',
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  pink: 'pink',
  orange: 'orange',
  teal: 'teal',
  indigo: 'indigo',
  gray: 'gray'
};

export default function CategoryManagement() {
  const { categories, addCategory, updateCategory, deleteCategory, reorderCategories, setCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('local_pizza');
  const [newCategoryColor, setNewCategoryColor] = useState('red');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const categoryData = {
        name: newCategoryName,
        icon: newCategoryIcon,
        color: newCategoryColor,
        slug: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
        id: Date.now().toString()
      };

      console.log('Saving category with data:', categoryData); // Debug log

      const response = await fetch('http://127.0.0.1:5000/product/addCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const addedCategory = await response.json();
      console.log('Server response:', addedCategory); // Debug log
      
      // Ensure the icon is included in the added category
      const categoryWithIcon = {
        ...addedCategory,
        icon: addedCategory.icon || newCategoryIcon
      };
      
      setCategories(prevCategories => [...prevCategories, categoryWithIcon]);
      
      // Reset form
      setNewCategoryName('');
      setNewCategoryIcon('local_pizza');
      setNewCategoryColor('red');
    } catch (error) {
      console.error('Error adding category:', error);
    }
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

  const handleDeleteCategory = async (category) => {
    console.log('Category to delete:', category);
    
    // Always use slug for deletion
    const slug = category.slug;
    if (!slug) {
      console.error('No slug found for category');
      return;
    }

    const url = `http://127.0.0.1:5000/product/deleteCategory/${slug}`;
    console.log('Delete category URL:', url);
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      // Update local state using slug
      setCategories(prevCategories => prevCategories.filter(c => c.slug !== slug));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4">Product Categories</h3>
      
      {/* Add New Category Form */}
      <div className="mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category Name</label>
            <input 
              type="text" 
              placeholder="Enter category name" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Icon</label>
              <div className="relative">
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                >
                  {AVAILABLE_ICONS.map(({ name, icon }) => (
                    <option key={icon} value={icon}>{name}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400">expand_more</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Color</label>
              <div className="relative">
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                >
                  {AVAILABLE_COLORS.map(({ name, value }) => (
                    <option key={value} value={value}>{name}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Preview */}
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-gray-50 mt-4">
          <div className="flex items-center gap-2">
            <div className={`bg-${COLOR_MAP[newCategoryColor]}-100 p-2 rounded-full`}>
              <span className={`material-symbols-outlined text-${COLOR_MAP[newCategoryColor]}-600`}>
                {newCategoryIcon}
              </span>
            </div>
            <span className="font-medium">{newCategoryName || 'New Category'}</span>
          </div>
          <button 
            className="bg-primary-600 text-white p-2 rounded-md hover:bg-primary-700 transition-colors"
            onClick={handleAddCategory}
            title="Add Category"
          >
            <span className="material-symbols-outlined">check</span>
          </button>
        </div>
      </div>
      
      {/* Categories List */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-400 cursor-move">drag_indicator</span>
              <div className="flex items-center gap-2">
                <div className={`bg-${COLOR_MAP[category.color]}-100 p-2 rounded-full`}>
                  <span className={`material-symbols-outlined text-${COLOR_MAP[category.color]}-600`}>
                    {category.icon || 'restaurant'}
                  </span>
                </div>
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
                onClick={() => handleDeleteCategory(category)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Category Modal */}
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
                <div className="grid grid-cols-5 gap-2">
                  {AVAILABLE_ICONS.map(({ name, icon }) => (
                    <button
                      key={icon}
                      className={`p-2 rounded-md border ${
                        editingCategory.icon === icon 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setEditingCategory({...editingCategory, icon})}
                    >
                      <span className="material-symbols-outlined">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {AVAILABLE_COLORS.map(({ name, value }) => (
                    <button
                      key={value}
                      className={`p-2 rounded-md border ${
                        editingCategory.color === value 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setEditingCategory({...editingCategory, color: value})}
                    >
                      <div className={`w-6 h-6 rounded-full bg-${value.split('-')[0]}-500`}></div>
                    </button>
                  ))}
                </div>
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