import { useState } from 'react';
import { useSupplements } from '../../hooks/useSupplements';

const typeLabels = {
  supplement: 'Supplement',
  boisson: 'Boisson',
  accompagnement: 'Accompagnement',
  extra: 'Extra'
};

export default function SupplementList({ supplements, onEdit, onAddNew, onDelete, loading }) {
  const { deleteSupplement } = useSupplements();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (supplementId) => {
    try {
      setDeletingId(supplementId);
      await deleteSupplement(supplementId);
      if (onDelete) {
        onDelete(supplementId);
      }
    } catch (error) {
      console.error('Error deleting supplement:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const truncateDescription = (text, maxLength = 80) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="grid grid-cols-12 gap-2 p-4 border-b text-gray-600 font-medium bg-gray-50">
          <div className="col-span-1"></div>
          <div className="col-span-5">Supplement</div>
          <div className="col-span-2 text-right pr-4">Price</div>
          <div className="col-span-2 text-center">Type</div>
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

  if (!supplements || supplements.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg p-8 text-center">
        <div className="mb-4">
          <span className="material-symbols-outlined text-6xl text-gray-300">inventory_2</span>
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No supplements found</h3>
        <p className="text-gray-500 mb-6">Get started by adding your first supplement.</p>
        <button 
          className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
          onClick={onAddNew}
        >
          <span className="material-symbols-outlined">add</span>
          Add New Supplement
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="grid grid-cols-12 gap-2 p-4 border-b text-gray-600 font-medium bg-gray-50">
        <div className="col-span-1"></div>
        <div className="col-span-5">Supplement</div>
        <div className="col-span-2 text-right pr-4">Price</div>
        <div className="col-span-2 text-center">Type</div>
        <div className="col-span-2 text-center">Actions</div>
      </div>
      <div className="divide-y">
        {supplements.map((supplement) => {
          const price = parseFloat(supplement.price || 0);
          const imageUrl = supplement.image?.startsWith('http')
            ? supplement.image
            : supplement.image
              ? `http://localhost:5000${supplement.image}`
              : null;
          return (
            <div key={supplement.id} className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1 flex justify-center">
                <span className="material-symbols-outlined text-gray-400 cursor-move">drag_indicator</span>
              </div>
              <div className="col-span-5 flex gap-3 items-center overflow-hidden">
                <div className="w-14 h-14 min-w-[56px] bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={supplement.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                        e.target.style.display = 'none';
                        e.target.parentNode.querySelector('.supplement-fallback-icon').style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="supplement-fallback-icon w-full h-full flex items-center justify-center text-gray-400 bg-gray-50" style={{display: imageUrl ? 'none' : 'flex'}}>
                    <span className="material-symbols-outlined text-3xl">restaurant</span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-800 truncate">{supplement.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2 break-words">{truncateDescription(supplement.description)}</p>
                </div>
              </div>
              <div className="col-span-2 text-right pr-4">
                <span className="font-medium">${price.toFixed(2)}</span>
              </div>
              <div className="col-span-2 flex justify-center">
                <span className="px-2 py-1 rounded-full text-xs whitespace-nowrap bg-blue-100 text-blue-600">
                  {typeLabels[supplement.type] || supplement.type}
                </span>
              </div>
              <div className="col-span-2 flex justify-center space-x-1">
                <button 
                  className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                  onClick={() => onEdit(supplement)}
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-primary-600">edit</span>
                </button>
                <button 
                  className={`p-1.5 rounded transition-colors ${deletingId === supplement.id ? 'text-gray-400' : 'hover:bg-gray-200 hover:text-red-500'}`}
                  onClick={() => handleDelete(supplement.id)}
                  disabled={deletingId === supplement.id}
                  title="Delete"
                >
                  {deletingId === supplement.id ? (
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