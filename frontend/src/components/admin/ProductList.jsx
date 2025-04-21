import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

export default function ProductList({ products, categories, onEdit, onAddNew, onDelete, loading }) {
  const { deleteProduct } = useProducts();
  const [deletingId, setDeletingId] = useState(null);
  
  const getCategoryById = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category || { name: 'Uncategorized', color: 'gray' };
  };
  
  const handleDelete = async (productId) => {
    try {
      setDeletingId(productId);
      await deleteProduct(productId);
      if (onDelete) {
        onDelete(productId);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // Truncate description to a reasonable length
  const truncateDescription = (text, maxLength = 80) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="grid grid-cols-12 gap-2 p-4 border-b text-gray-600 font-medium bg-gray-50">
          <div className="col-span-1"></div>
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-right pr-4">Price</div>
          <div className="col-span-2 text-center">Category</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>
        
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 p-4 items-center border-b">
              <div className="col-span-1"></div>
              <div className="col-span-5 flex gap-3 items-center">
                <div className="bg-gray-200 h-12 w-12 rounded-md"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="col-span-2 flex justify-center">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="col-span-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg p-8 text-center">
        <div className="mb-4">
          <span className="material-symbols-outlined text-6xl text-gray-300">inventory_2</span>
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
        <p className="text-gray-500 mb-6">Get started by adding your first product.</p>
        <button 
          className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
          onClick={onAddNew}
        >
          <span className="material-symbols-outlined">add</span>
          Add New Product
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="grid grid-cols-12 gap-2 p-4 border-b text-gray-600 font-medium bg-gray-50">
        <div className="col-span-1"></div>
        <div className="col-span-5">Product</div>
        <div className="col-span-2 text-right pr-4">Price</div>
        <div className="col-span-2 text-center">Category</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>
      
      <div className="divide-y">
        {products.map((product) => {
          const categoryId = product.categoryId || product.category_id || product.categoryId;
          const categorySlug = product.category || product.category_slug;
          
          // Just use the slug as the category name
          const categoryName = categorySlug || 'Uncategorized';
          const categoryColor = 'blue'; // Default color for all categories
          
          const price = parseFloat(product.price || 0);
          
          // Construct image URL - using the same logic as FoodItemCard
          const imageUrl = product.images?.[0] 
            ? `http://localhost:5000${product.images[0]}`
            : null;
          
          return (
            <div key={product.id || product._id} className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1 flex justify-center">
                <span className="material-symbols-outlined text-gray-400 cursor-move">drag_indicator</span>
              </div>
              <div className="col-span-5 flex gap-3 items-center overflow-hidden">
                <div className="w-14 h-14 min-w-[56px] bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/56x56?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                      <span className="material-symbols-outlined">image_not_supported</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-800 truncate">{product.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 break-words">{truncateDescription(product.description)}</p>
                </div>
              </div>
              <div className="col-span-2 text-right pr-4">
                {product.discount ? (
                  <div className="flex flex-col items-end">
                    <span className="line-through text-gray-400 text-xs">${price.toFixed(2)}</span>
                    <span className="font-medium text-primary-600">${(price * (1 - product.discount / 100)).toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="font-medium">${price.toFixed(2)}</span>
                )}
              </div>
              <div className="col-span-2 flex justify-center">
                <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                  categoryColor === 'gray' ? 'bg-gray-100 text-gray-800' :
                  categoryColor === 'red' ? 'bg-red-100 text-red-800' :
                  categoryColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                  categoryColor === 'green' ? 'bg-green-100 text-green-800' :
                  categoryColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                  categoryColor === 'purple' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {categoryName}
                </span>
              </div>
              <div className="col-span-2 flex justify-center space-x-1">
                <button 
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  onClick={() => onEdit(product)}
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-primary-600">edit</span>
                </button>
                <button 
                  className={`p-1.5 rounded transition-colors ${deletingId === product.id ? 'text-gray-400' : 'hover:bg-gray-200 hover:text-red-500'}`}
                  onClick={() => handleDelete(product.id || product._id)}
                  disabled={deletingId === product.id}
                  title="Delete"
                >
                  {deletingId === product.id ? (
                    <span className="material-symbols-outlined animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined">delete</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 