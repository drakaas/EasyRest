import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useProducts() {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/product/allProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token if available
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match our expected format if needed
      const formattedProducts = data.map(product => ({
        id: product._id || product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId,
        image: product.image,
        discount: product.discount || null,
        promoEndDate: product.promoEndDate || null,
        tags: product.tags || [],
        createdAt: product.createdAt || new Date().toISOString(),
        status: product.status || 'active'
      }));
      
      setProducts(formattedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (productData) => {
    try {
      const response = await fetch('http://localhost:5000/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const newProduct = await response.json();
      
      // Add the new product to the state
      setProducts(prev => [...prev, {
        id: newProduct._id || newProduct.id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        categoryId: newProduct.categoryId,
        image: newProduct.image,
        discount: newProduct.discount || null,
        promoEndDate: newProduct.promoEndDate || null,
        tags: newProduct.tags || [],
        createdAt: newProduct.createdAt || new Date().toISOString(),
        status: newProduct.status || 'active'
      }]);
      
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw new Error('Failed to add product');
    }
  }, [token]);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      const response = await fetch(`http://localhost:5000/product/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedProduct = await response.json();
      
      // Update the product in the state
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? {
            ...product,
            ...productData,
            id: updatedProduct._id || updatedProduct.id || id
          } : product
        )
      );
      
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error('Failed to update product');
    }
  }, [token]);

  const deleteProduct = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/product/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Remove the product from the state
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      throw new Error('Failed to delete product');
    }
  }, [token]);

  const duplicateProduct = useCallback(async (id) => {
    try {
      const productToDuplicate = products.find(p => p.id === id);
      if (!productToDuplicate) throw new Error('Product not found');
      
      // Create a copy of the product with a new name
      const duplicatedData = {
        ...productToDuplicate,
        name: `${productToDuplicate.name} (Copy)`,
      };
      
      // Remove the id so a new one will be generated
      delete duplicatedData.id;
      
      // Call the add product API
      return await addProduct(duplicatedData);
    } catch (err) {
      console.error('Error duplicating product:', err);
      throw new Error('Failed to duplicate product');
    }
  }, [products, addProduct]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct
  };
} 