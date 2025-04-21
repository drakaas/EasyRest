import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

// Mock products for demo (would use API in real app)
const initialProducts = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 12.99,
    categoryId: '1',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    status: 'active',
    discount: null,
    promoEndDate: null,
    tags: ['Italian', 'Vegetarian'],
    createdAt: '2023-01-15T12:00:00Z'
  },
  {
    id: '2',
    name: 'Classic Burger',
    description: 'Beef patty, lettuce, tomato, cheese, and our special sauce',
    price: 9.99,
    categoryId: '2',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    status: 'active',
    discount: 10,
    promoEndDate: '2023-12-31',
    tags: ['American', 'Beef'],
    createdAt: '2023-02-10T12:00:00Z'
  },
  {
    id: '3',
    name: 'Iced Tea',
    description: 'Sweet or unsweetened',
    price: 3.49,
    categoryId: '4',
    image: 'https://images.unsplash.com/photo-1556679343-c1917e0ada6d',
    status: 'active',
    discount: null,
    promoEndDate: null,
    tags: ['Drinks', 'Cold'],
    createdAt: '2023-03-05T12:00:00Z'
  }
];

export function useProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, fetch from API
      // const response = await fetch('/api/products');
      // const data = await response.json();
      
      // Using mock data for demonstration
      setTimeout(() => {
        setProducts(initialProducts);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setLoading(false);
    }
  }, []);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (productData) => {
    try {
      // In a real app, post to API
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(productData)
      // });
      // const newProduct = await response.json();
      
      // Using mock for demonstration
      const newProduct = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...productData
      };
      
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw new Error('Failed to add product');
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      // In a real app, put to API
      // const response = await fetch(`/api/products/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(productData)
      // });
      // const updatedProduct = await response.json();
      
      // Using mock for demonstration
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? { ...product, ...productData } : product
        )
      );
      
      return productData;
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error('Failed to update product');
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      // In a real app, delete from API
      // await fetch(`/api/products/${id}`, {
      //   method: 'DELETE'
      // });
      
      // Using mock for demonstration
      await new Promise(resolve => setTimeout(resolve, 500)); // simulate network delay
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      throw new Error('Failed to delete product');
    }
  }, []);

  const duplicateProduct = useCallback(async (id) => {
    try {
      // Find product to duplicate
      const productToDuplicate = products.find(p => p.id === id);
      if (!productToDuplicate) throw new Error('Product not found');
      
      // In a real app, post to API
      // const response = await fetch('/api/products/duplicate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ id })
      // });
      // const duplicatedProduct = await response.json();
      
      // Using mock for demonstration
      const duplicatedProduct = {
        ...productToDuplicate,
        id: Date.now().toString(),
        name: `${productToDuplicate.name} (Copy)`,
        createdAt: new Date().toISOString()
      };
      
      setProducts(prev => [...prev, duplicatedProduct]);
      return duplicatedProduct;
    } catch (err) {
      console.error('Error duplicating product:', err);
      throw new Error('Failed to duplicate product');
    }
  }, [products]);

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