import { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useToast } from '../../context/ToastContext';

export default function ProductEditor({ product, categories, onCancelEdit }) {
  const initialState = {
    id: '',
    name: '',
    description: '',
    price: '',
    discount: '',
    images: [],
    categoryId: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const { createProduct, updateProduct } = useProducts();
  const { showToast } = useToast();
  const MAX_IMAGES = 5;

  // Initialize form with product data if provided
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        discount: product.discount || '',
        images: product.images || product.image ? [product.image] : [],
        categoryId: product.categoryId || ''
      });
      
      setImagePreview(product.images || product.image ? [product.image] : []);
    } else {
      setFormData(initialState);
      setImagePreview([]);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'discount') {
      // Only allow valid number input
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (imagePreview.length + files.length > MAX_IMAGES) {
      showToast(`You can upload maximum ${MAX_IMAGES} images`, 'error');
      return;
    }

    // Process each file
    files.forEach(file => {
      // Simple validation
      if (!file.type.match('image.*')) {
        showToast('Please select image files only', 'error');
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(prev => [...prev, reader.result]);
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
    
    // Reset file input
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price) {
      showToast('Name and price are required', 'error');
      return;
    }

    if (!formData.images.length) {
      showToast('At least one product image is required', 'error');
      return;
    }
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      discount: formData.discount ? parseFloat(formData.discount) : 0
    };
    
    try {
      setLoading(true);
      
      if (product?.id) {
        await updateProduct(productData);
        showToast('Product updated successfully', 'success');
      } else {
        await createProduct(productData);
        showToast('Product created successfully', 'success');
      }
      
      onCancelEdit();
    } catch (error) {
      console.error('Error saving product:', error);
      showToast(error.message || 'Error saving product', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-medium">{product?.id ? 'Edit Product' : 'Add New Product'}</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onCancelEdit}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          {/* Product images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images * ({imagePreview.length}/{MAX_IMAGES})
            </label>
            <div className="flex flex-wrap gap-4">
              {/* Image previews */}
              {imagePreview.map((src, index) => (
                <div key={index} className="relative">
                  <div className="w-24 h-24 border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
                    <img 
                      src={src} 
                      alt={`Product preview ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
              
              {/* Add image button (only show if less than max images) */}
              {imagePreview.length < MAX_IMAGES && (
                <div>
                  <input
                    type="file"
                    id="productImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple
                    className="hidden"
                  />
                  <label
                    htmlFor="productImage"
                    className="w-24 h-24 border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                  >
                    <span className="material-symbols-outlined text-gray-400 text-2xl">add_photo_alternate</span>
                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
                  </label>
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Recommended size: 500x500px. Max: {MAX_IMAGES} images.
            </p>
          </div>
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2">$</span>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            
            {/* Discount */}
            <div>
              <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                Discount %
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full pr-7 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <span className="absolute right-3 top-2">%</span>
              </div>
            </div>
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin mr-2">sync</span>
                Saving...
              </>
            ) : (
              'Save Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 