import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';

export default function ProductList({ products, categories, onEdit, onAddNew, loading }) {
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
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="grid grid-cols-12 gap-4 p-4 border-b text-gray-600 font-medium bg-gray-50">
          <div className="col-span-1"></div>
          <div className="col-span-5">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Category</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>
        
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center border-b">
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

  if (products.length === 0) {
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
      <div className="grid grid-cols-12 gap-4 p-4 border-b text-gray-600 font-medium bg-gray-50">
        <div className="col-span-1"></div>
        <div className="col-span-5">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Category</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>
      
      <div className="divide-y">
        {products.map((product) => {
          const category = getCategoryById(product.categoryId);
          
          return (
            <div key={product.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1 flex justify-center">
                <span className="material-symbols-outlined text-gray-400 cursor-move">drag_indicator</span>
              </div>
              <div className="col-span-5 flex gap-3 items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined">image_not_supported</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                </div>
              </div>
              <div className="col-span-2 text-center">
                {product.discount ? (
                  <div>
                    <span className="line-through text-gray-400 text-sm mr-1">${product.price.toFixed(2)}</span>
                    <span className="font-medium">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                  </div>
                ) : (
                  <span>${product.price.toFixed(2)}</span>
                )}
              </div>
              <div className="col-span-2 text-center">
                <span className={`bg-${category.color}-100 text-${category.color}-800 px-2 py-1 rounded-full text-xs`}>
                  {category.name}
                </span>
              </div>
              <div className="col-span-2 flex justify-center gap-2">
                <button 
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  onClick={() => onEdit(product)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button 
                  className={`p-1 rounded transition-colors ${deletingId === product.id ? 'text-gray-400' : 'hover:bg-gray-200 hover:text-red-500'}`}
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
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