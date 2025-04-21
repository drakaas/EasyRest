import { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';

export default function ProductEditor({ product, categories, onSave, onCancel }) {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    image: '',
    hasPromotion: false,
    discount: '',
    promoEndDate: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  // Initialize form data if editing existing product
  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        categoryId: product.categoryId || '',
        image: product.image || '',
        hasPromotion: !!product.discount,
        discount: product.discount || '',
        promoEndDate: product.promoEndDate || '',
        tags: product.tags || []
      });
      setImagePreview(product.image || '');
    } else {
      // Set default category if available
      if (categories?.length > 0) {
        setFormData(prev => ({
          ...prev,
          categoryId: categories[0].id
        }));
      }
    }
  }, [product, categories]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, you'd upload to server here
    // For now, create a local URL to preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = tagInput.trim();
    if (!formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than zero';
    if (!formData.categoryId) newErrors.categoryId = 'Category is required';
    
    if (formData.hasPromotion) {
      if (!formData.discount) newErrors.discount = 'Discount percentage is required';
      if (formData.discount <= 0 || formData.discount > 100) {
        newErrors.discount = 'Discount must be between 1 and 100%';
      }
      if (!formData.promoEndDate) newErrors.promoEndDate = 'Promotion end date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      if (product) {
        await updateProduct(formData.id, formData);
      } else {
        await addProduct(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      setErrors(prev => ({ ...prev, form: 'Failed to save product. Please try again.' }));
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-6">
          {/* Image Upload */}
          <div className="w-48">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center p-4 hover:border-primary-500 transition-colors cursor-pointer relative group"
              onClick={() => document.getElementById('product-image').click()}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Product Preview" 
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined text-2xl mb-2">file_upload</span>
                  <span className="text-sm text-center">Drag image or click to upload</span>
                </div>
              )}
              <div className="absolute bg-black bg-opacity-50 inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center text-white">
                <span className="material-symbols-outlined mb-2">file_upload</span>
                <span className="text-sm">Change image</span>
              </div>
              <input 
                type="file" 
                id="product-image" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">Recommended size: 500x500px</div>
          </div>
          
          {/* Product Details */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Product Title</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <div className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md overflow-hidden`}>
                <div className="bg-gray-50 border-b border-gray-300 px-3 py-1 flex items-center gap-2">
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="material-symbols-outlined text-sm">format_bold</span>
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="material-symbols-outlined text-sm">format_italic</span>
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="material-symbols-outlined text-sm">format_underlined</span>
                  </button>
                  <span className="border-r border-gray-300 h-5"></span>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="material-symbols-outlined text-sm">format_list_numbered</span>
                  </button>
                </div>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                  rows="3"
                ></textarea>
              </div>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm text-gray-600 mb-1">Price</label>
                <div className="flex">
                  <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-3 py-2">$</span>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01" 
                    min="0" 
                    className={`flex-1 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              
              <div className="w-full md:w-1/2">
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <select 
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={`w-full border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
              </div>
            </div>
            
            <div>
              <label className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <span>Promotion</span>
                <label className="relative inline-flex items-center cursor-pointer ml-2">
                  <input 
                    type="checkbox"
                    name="hasPromotion"
                    checked={formData.hasPromotion}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </label>
              {formData.hasPromotion && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Discount (%)</label>
                    <input 
                      type="number" 
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="0" 
                      min="0" 
                      max="100" 
                      className={`w-full border ${errors.discount ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                    />
                    {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <input 
                      type="date" 
                      name="promoEndDate"
                      value={formData.promoEndDate}
                      onChange={handleChange}
                      className={`w-full border ${errors.promoEndDate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                    />
                    {errors.promoEndDate && <p className="text-red-500 text-xs mt-1">{errors.promoEndDate}</p>}
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tags</label>
              <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center gap-1">
                    <span>{tag}</span>
                    <button 
                      type="button"
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ))}
                <div className="flex-1 min-w-[100px]">
                  <input 
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add a tag..." 
                    className="border-none outline-none bg-transparent text-sm w-full" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {errors.form && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {errors.form}
          </div>
        )}
        
        <div className="flex justify-end gap-3 mt-6">
          <button 
            type="button"
            className="border border-gray-300 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors"
          >
            {product ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
} 