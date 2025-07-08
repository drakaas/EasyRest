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

// Static data - will be replaced with API call later
const staticData = {
  supplements: [
    {
      _id: '1',
      name: 'Extra Cheese',
      description: 'Premium melted mozzarella cheese',
      price: 2.99,
      stock: 100,
      category: 'supplements'
    },
    {
      _id: '2',
      name: 'Pepperoni',
      description: 'Classic sliced pepperoni',
      price: 3.49,
      stock: 80,
      category: 'supplements'
    },
    {
      _id: '3',
      name: 'Mushrooms',
      description: 'Fresh sliced mushrooms',
      price: 2.49,
      stock: 90,
      category: 'supplements'
    }
  ],
  sauces: [
    {
      _id: '4',
      name: 'Garlic Sauce',
      description: 'Creamy garlic dipping sauce',
      price: 1.99,
      stock: 150,
      category: 'sauces'
    },
    {
      _id: '5',
      name: 'BBQ Sauce',
      description: 'Sweet and tangy barbecue sauce',
      price: 1.99,
      stock: 120,
      category: 'sauces'
    },
    {
      _id: '6',
      name: 'Hot Sauce',
      description: 'Spicy chili pepper sauce',
      price: 1.99,
      stock: 100,
      category: 'sauces'
    }
  ]
};

const API_BASE = 'http://localhost:5000/product';

export function useProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supplements, setSupplements] = useState([]);
  const [sauces, setSauces] = useState([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/allProducts`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
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
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.categoryId);
      formData.append('stock', productData.stock || 0);
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach(img => formData.append('images', img));
      } else if (productData.image) {
        // If image is a File or base64 string
        if (productData.image instanceof File) {
          formData.append('images', productData.image);
        } else if (typeof productData.image === 'string' && productData.image.startsWith('data:')) {
          // Convert base64 to Blob
          const arr = productData.image.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) u8arr[n] = bstr.charCodeAt(n);
          const file = new File([u8arr], 'image.png', { type: mime });
          formData.append('images', file);
        }
      }
      if (productData.supplements) {
        formData.append('supplements', JSON.stringify(productData.supplements));
      }
      // Add other fields as needed
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add product');
      }
      const newProduct = await response.json();
      await fetchProducts();
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw new Error('Failed to add product');
    }
  }, [fetchProducts]);

  const updateProduct = useCallback(async (id, productData) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.categoryId);
      formData.append('stock', productData.stock || 0);
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach(img => formData.append('images', img));
      } else if (productData.image) {
        if (productData.image instanceof File) {
          formData.append('images', productData.image);
        } else if (typeof productData.image === 'string' && productData.image.startsWith('data:')) {
          const arr = productData.image.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) u8arr[n] = bstr.charCodeAt(n);
          const file = new File([u8arr], 'image.png', { type: mime });
          formData.append('images', file);
        }
      }
      if (productData.supplements) {
        formData.append('supplements', JSON.stringify(productData.supplements));
      }
      // Add other fields as needed
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        body: formData
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update product');
      }
      const updatedProduct = await response.json();
      await fetchProducts();
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error('Failed to update product');
    }
  }, [fetchProducts]);

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
    duplicateProduct,
    supplements,
    sauces
  };
} 