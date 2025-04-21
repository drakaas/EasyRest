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
  { name: "Yellow", value: "yellow" },
  { name: "Green", value: "green" },
  { name: "Blue", value: "blue" },
  { name: "Purple", value: "purple" },
  { name: "Pink", value: "pink" },
  { name: "Orange", value: "orange" },
  { name: "Teal", value: "teal" },
  { name: "Indigo", value: "indigo" },
  { name: "Gray", value: "gray" }
];

export default function CategoryManagement() {
  const { categories, addCategory, updateCategory, deleteCategory, reorderCategories } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('local_pizza');
  const [newCategoryColor, setNewCategoryColor] = useState('red');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    addCategory({
      name: newCategoryName,
      icon: newCategoryIcon,
      color: newCategoryColor
    });
    
    setNewCategoryName('');
    setNewCategoryIcon('local_pizza');
    setNewCategoryColor('red');
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
      
      {/* Add New Category Form */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Icon</label>
            <div className="grid grid-cols-6 gap-2 p-2 bg-gray-50 rounded-lg">
              {AVAILABLE_ICONS.map(({ name, icon }) => (
                <button
                  key={icon}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    newCategoryIcon === icon 
                      ? 'bg-white shadow-sm border border-primary-200' 
                      : 'hover:bg-white hover:shadow-sm border border-transparent'
                  }`}
                  onClick={() => setNewCategoryIcon(icon)}
                  title={name}
                >
                  <span className={`material-symbols-outlined text-xl ${
                    newCategoryIcon === icon ? 'text-primary-600' : 'text-gray-600'
                  }`}>
                    {icon}
                  </span>
                  <span className="text-xs mt-1 text-gray-500 truncate w-full text-center">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Color</label>
            <div className="grid grid-cols-6 gap-2 p-2 bg-gray-50 rounded-lg">
              {AVAILABLE_COLORS.map(({ name, value }) => (
                <button
                  key={value}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    newCategoryColor === value 
                      ? 'bg-white shadow-sm border border-primary-200' 
                      : 'hover:bg-white hover:shadow-sm border border-transparent'
                  }`}
                  onClick={() => setNewCategoryColor(value)}
                  title={name}
                >
                  <div className={`w-8 h-8 rounded-full bg-${value}-500 shadow-sm`}></div>
                  <span className="text-xs mt-1 text-gray-500 truncate w-full text-center">
                    {name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-end">
            <button 
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>
        </div>
        
        {/* Preview */}
        <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-md bg-gray-50">
          <div className={`bg-${newCategoryColor}-100 p-2 rounded-full`}>
            <span className={`material-symbols-outlined text-${newCategoryColor}-600`}>
              {newCategoryIcon}
            </span>
          </div>
          <span className="font-medium">{newCategoryName || 'New Category'}</span>
        </div>
      </div>
      
      {/* Categories List */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-gray-400 cursor-move">drag_indicator</span>
              <div className="flex items-center gap-2">
                <div className={`bg-${category.color}-100 p-2 rounded-full`}>
                  <span className={`material-symbols-outlined text-${category.color}-600`}>
                    {category.icon}
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
                <div className="grid grid-cols-6 gap-2 p-2 bg-gray-50 rounded-lg">
                  {AVAILABLE_ICONS.map(({ name, icon }) => (
                    <button
                      key={icon}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                        editingCategory.icon === icon 
                          ? 'bg-white shadow-sm border border-primary-200' 
                          : 'hover:bg-white hover:shadow-sm border border-transparent'
                      }`}
                      onClick={() => setEditingCategory({...editingCategory, icon})}
                      title={name}
                    >
                      <span className={`material-symbols-outlined text-xl ${
                        editingCategory.icon === icon ? 'text-primary-600' : 'text-gray-600'
                      }`}>
                        {icon}
                      </span>
                      <span className="text-xs mt-1 text-gray-500 truncate w-full text-center">
                        {name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Color</label>
                <div className="grid grid-cols-6 gap-2 p-2 bg-gray-50 rounded-lg">
                  {AVAILABLE_COLORS.map(({ name, value }) => (
                    <button
                      key={value}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                        editingCategory.color === value 
                          ? 'bg-white shadow-sm border border-primary-200' 
                          : 'hover:bg-white hover:shadow-sm border border-transparent'
                      }`}
                      onClick={() => setEditingCategory({...editingCategory, color: value})}
                      title={name}
                    >
                      <div className={`w-8 h-8 rounded-full bg-${value}-500 shadow-sm`}></div>
                      <span className="text-xs mt-1 text-gray-500 truncate w-full text-center">
                        {name}
                      </span>
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