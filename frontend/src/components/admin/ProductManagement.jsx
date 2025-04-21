import { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import ProductEditor from './ProductEditor';
import ProductList from './ProductList';

export default function ProductManagement() {
  const { products, loading, error, fetchProducts } = useProducts();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  // Initial data fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      product.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort the filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle product selection for editing
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditor(true);
  };

  // Handle new product creation
  const handleNewProduct = () => {
    setSelectedProduct(null); // Reset selected product to create new
    setShowEditor(true);
  };

  // Handle product editor close
  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedProduct(null);
  };

  // Handle product saved (created/updated)
  const handleProductSaved = () => {
    setShowEditor(false);
    setSelectedProduct(null);
    fetchProducts(); // Refresh the product list
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-medium mb-4">Product Management</h3>
      
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
          </div>
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
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
      
      {/* Product Editor */}
      {showEditor && (
        <ProductEditor 
          product={selectedProduct} 
          categories={categories}
          onSave={handleProductSaved}
          onCancel={handleCloseEditor}
        />
      )}
      
      {/* Product List */}
      <ProductList 
        products={currentItems}
        categories={categories}
        onEdit={handleEditProduct}
        onAddNew={handleNewProduct}
        loading={loading}
      />
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 flex justify-between items-center border-t mt-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length} products
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button 
                key={index}
                className={`w-8 h-8 ${currentPage === index + 1 
                  ? 'bg-primary-600 text-white' 
                  : 'border border-gray-300 hover:bg-gray-100'} rounded-md flex items-center justify-center transition-colors`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
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