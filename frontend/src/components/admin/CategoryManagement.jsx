import { useState, useRef } from 'react';
import { useCategories } from '../../hooks/useCategories';

// Available icons for categories
const AVAILABLE_ICONS = [
  { name: "local_pizza", displayName: "Pizza" },
  { name: "lunch_dining", displayName: "Burger" },
  { name: "restaurant", displayName: "Sides" },
  { name: "local_bar", displayName: "Drinks" },
  { name: "bakery_dining", displayName: "Bakery" },
  { name: "cake", displayName: "Dessert" },
  { name: "icecream", displayName: "Ice Cream" },
  { name: "egg", displayName: "Breakfast" },
  { name: "coffee", displayName: "Coffee" },
  { name: "ramen_dining", displayName: "Noodles" },
  { name: "rice_bowl", displayName: "Rice" },
  { name: "kebab_dining", displayName: "Kebab" },
  { name: "local_dining", displayName: "Food" },
  { name: "fastfood", displayName: "Fast Food" },
  { name: "star", displayName: "Special" },
  { name: "category", displayName: "Other" }
];

// Available colors for categories
const AVAILABLE_COLORS = [
  { name: "red", displayName: "Red" },
  { name: "orange", displayName: "Orange" },
  { name: "amber", displayName: "Amber" },
  { name: "yellow", displayName: "Yellow" },
  { name: "lime", displayName: "Lime" },
  { name: "green", displayName: "Green" },
  { name: "emerald", displayName: "Emerald" },
  { name: "teal", displayName: "Teal" },
  { name: "cyan", displayName: "Cyan" },
  { name: "sky", displayName: "Sky" },
  { name: "blue", displayName: "Blue" },
  { name: "indigo", displayName: "Indigo" },
  { name: "violet", displayName: "Violet" },
  { name: "purple", displayName: "Purple" },
  { name: "fuchsia", displayName: "Fuchsia" },
  { name: "pink", displayName: "Pink" },
  { name: "rose", displayName: "Rose" },
  { name: "gray", displayName: "Gray" }
];

export default function CategoryManagement() {
  const { categories, addCategory, updateCategory, deleteCategory, reorderCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('category');
  const [newCategoryColor, setNewCategoryColor] = useState('gray');
  const [editingCategory, setEditingCategory] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  
  // Ref for the dragging element
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    addCategory({
      name: newCategoryName,
      icon: newCategoryIcon,
      color: newCategoryColor
    });
    
    setNewCategoryName('');
    setNewCategoryIcon('category');
    setNewCategoryColor('gray');
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
  
  // Handle drag start
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    setDraggedIndex(index);
    // Add styling to indicate dragging
    e.currentTarget.classList.add('bg-gray-100');
  };
  
  // Handle drag end
  const handleDragEnd = (e) => {
    setDraggedIndex(null);
    e.currentTarget.classList.remove('bg-gray-100');
    dragItem.current = null;
    dragOverItem.current = null;
  };
  
  // Handle drag over
  const handleDragOver = (e, index) => {
    e.preventDefault();
    dragOverItem.current = index;
  };
  
  // Handle drop - reorder categories
  const handleDrop = (e) => {
    e.preventDefault();
    
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const newOrder = [...categories];
      const draggedItem = newOrder[dragItem.current];
      
      // Remove the item from the original position
      newOrder.splice(dragItem.current, 1);
      
      // Insert the item at the new position
      newOrder.splice(dragOverItem.current, 0, draggedItem);
      
      // Update the order in state and backend
      const orderedIds = newOrder.map(cat => cat.id);
      reorderCategories(orderedIds);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4">Product Categories</h3>
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
          <input 
            type="text" 
            placeholder="Add new category" 
            className="md:col-span-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <select
            className="md:col-span-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={newCategoryIcon}
            onChange={(e) => setNewCategoryIcon(e.target.value)}
          >
            <option value="" disabled>Select an icon</option>
            {AVAILABLE_ICONS.map((icon) => (
              <option key={icon.name} value={icon.name}>
                {icon.displayName}
              </option>
            ))}
          </select>
          <select
            className="md:col-span-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={newCategoryColor}
            onChange={(e) => setNewCategoryColor(e.target.value)}
          >
            <option value="" disabled>Select a color</option>
            {AVAILABLE_COLORS.map((color) => (
              <option key={color.name} value={color.name}>
                {color.displayName}
              </option>
            ))}
          </select>
        </div>
        <button 
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors mt-2"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
        <div className="text-sm text-gray-500 mt-4">Drag and drop categories to reorder</div>
      </div>
      
      <div className="space-y-2">
        {/* Category items */}
        {categories.map((category, index) => (
          <div 
            key={category.id} 
            className={`flex items-center justify-between p-3 border ${draggedIndex === index ? 'border-primary-500 bg-gray-100' : 'border-gray-200'} rounded-md hover:bg-gray-50 transition-colors group`}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-400 cursor-move">drag_indicator</span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined" style={{ color: `var(--tw-color-${category.color}-500, #6b7280)` }}>
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
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={editingCategory.icon}
                  onChange={(e) => setEditingCategory({...editingCategory, icon: e.target.value})}
                >
                  {AVAILABLE_ICONS.map((icon) => (
                    <option key={icon.name} value={icon.name}>
                      {icon.displayName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Color</label>
                <select 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={editingCategory.color}
                  onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                >
                  {AVAILABLE_COLORS.map((color) => (
                    <option key={color.name} value={color.name}>
                      {color.displayName}
                    </option>
                  ))}
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