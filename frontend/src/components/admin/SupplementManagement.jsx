import { useState } from 'react';
import { useSupplements } from '../../hooks/useSupplements';
import SupplementEditor from './SupplementEditor';
import SupplementList from './SupplementList';

export default function SupplementManagement({ initialShowEditor = false }) {
  const [selectedType, setSelectedType] = useState('all');
  const { supplements, loading, error } = useSupplements(selectedType === 'all' ? null : selectedType);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [showEditor, setShowEditor] = useState(initialShowEditor);

  // Filter supplements based on search term
  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = searchTerm === '' || 
      supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplement.description && supplement.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Sort the filtered supplements
  const sortedSupplements = [...filteredSupplements].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return (a.price || 0) - (b.price || 0);
      case 'price-desc':
        return (b.price || 0) - (a.price || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSupplements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSupplements.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditSupplement = (supplement) => {
    setSelectedSupplement(supplement);
    setShowEditor(true);
  };

  const handleNewSupplement = () => {
    setSelectedSupplement(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedSupplement(null);
  };

  const handleSupplementSaved = () => {
    setShowEditor(false);
    setSelectedSupplement(null);
  };

  const handleSupplementDeleted = (supplementId) => {
    // No need to update state, useSupplements handles it
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-xl font-medium mb-4">Supplement Management</h3>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search supplements..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
          </div>
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="supplement">Supplement</option>
            <option value="boisson">Boisson</option>
            <option value="accompagnement">Accompagnement</option>
            <option value="extra">Extra</option>
          </select>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select 
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          Error loading supplements: {error}
        </div>
      )}
      {showEditor && (
        <SupplementEditor 
          supplement={selectedSupplement}
          onSave={handleSupplementSaved}
          onCancel={handleCloseEditor}
        />
      )}
      <SupplementList 
        supplements={currentItems}
        onEdit={handleEditSupplement}
        onAddNew={handleNewSupplement}
        onDelete={handleSupplementDeleted}
        loading={loading}
      />
      {totalPages > 1 && (
        <div className="p-4 flex justify-between items-center border-t mt-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedSupplements.length)} of {sortedSupplements.length} supplements
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`px-2 py-1 rounded ${currentPage === idx + 1 ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 