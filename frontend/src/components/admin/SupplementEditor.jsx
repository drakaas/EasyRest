import { useState, useEffect } from 'react';
import { useSupplements } from '../../hooks/useSupplements';

const typeOptions = [
  { value: 'supplement', label: 'Supplement' },
  { value: 'boisson', label: 'Boisson' },
  { value: 'accompagnement', label: 'Accompagnement' },
  { value: 'extra', label: 'Extra' }
];

export default function SupplementEditor({ supplement, onSave, onCancel }) {
  const { addSupplement, updateSupplement } = useSupplements();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: 'supplement',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (supplement) {
      setFormData({
        id: supplement.id,
        name: supplement.name || '',
        description: supplement.description || '',
        price: supplement.price || '',
        type: supplement.type || 'supplement',
        image: supplement.image || ''
      });
      setImagePreview(supplement.image || '');
    }
  }, [supplement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.price !== '' && formData.price < 0) newErrors.price = 'Price cannot be negative';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (supplement) {
        await updateSupplement(formData.id, formData);
      } else {
        await addSupplement(formData);
      }
      onSave();
    } catch (error) {
      setErrors(prev => ({ ...prev, form: 'Failed to save supplement. Please try again.' }));
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
              onClick={() => document.getElementById('supplement-image').click()}
            >
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Supplement Preview" 
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
                id="supplement-image" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">Recommended size: 500x500px</div>
          </div>
          {/* Supplement Details */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
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
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                rows={3}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Price (optional)</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                min="0"
                step="0.01"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>
          </div>
        </div>
        {errors.form && <div className="text-red-500 text-sm mb-2">{errors.form}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
} 