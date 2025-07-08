import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://127.0.0.1:5000/product';

export function useSupplements(type = null) {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSupplements = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = type
        ? `${API_BASE}/supplements/type/${type}`
        : `${API_BASE}/supplements`;
      const response = await fetch(url, { credentials: 'include' });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please log in as admin.');
        }
        throw new Error('Failed to fetch supplements');
      }
      const data = await response.json();
      setSupplements(data);
    } catch (err) {
      setError(err.message);
      setSupplements([]);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchSupplements();
  }, [fetchSupplements]);

  const addSupplement = useCallback(async (supplementData) => {
    const formData = new FormData();
    formData.append('name', supplementData.name);
    formData.append('description', supplementData.description);
    if (supplementData.price !== undefined && supplementData.price !== null && supplementData.price !== '') {
      formData.append('price', supplementData.price);
    }
    formData.append('type', supplementData.type);
    // If image is a File, append it; if it's a base64 string, convert to File
    if (supplementData.image instanceof File) {
      formData.append('image', supplementData.image);
    } else if (typeof supplementData.image === 'string' && supplementData.image.startsWith('data:')) {
      // Convert base64 to Blob
      const arr = supplementData.image.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      const file = new File([u8arr], 'image.png', { type: mime });
      formData.append('image', file);
    }
    const response = await fetch(`${API_BASE}/supplements`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to add supplement');
    }
    const newSupplement = await response.json();
    setSupplements(prev => [...prev, newSupplement]);
    return newSupplement;
  }, []);

  const updateSupplement = useCallback(async (id, supplementData) => {
    // We'll use PUT and allow image update if provided
    const formData = new FormData();
    formData.append('name', supplementData.name);
    formData.append('description', supplementData.description);
    if (supplementData.price !== undefined && supplementData.price !== null && supplementData.price !== '') {
      formData.append('price', supplementData.price);
    }
    formData.append('type', supplementData.type);
    if (supplementData.image instanceof File) {
      formData.append('image', supplementData.image);
    } else if (typeof supplementData.image === 'string' && supplementData.image.startsWith('data:')) {
      // Convert base64 to Blob
      const arr = supplementData.image.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      const file = new File([u8arr], 'image.png', { type: mime });
      formData.append('image', file);
    }
    const response = await fetch(`${API_BASE}/supplements/${id}`, {
      method: 'PUT',
      body: formData
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to update supplement');
    }
    const updatedSupplement = await response.json();
    setSupplements(prev => prev.map(s => (s._id === id || s.id === id) ? updatedSupplement : s));
    return updatedSupplement;
  }, []);

  const deleteSupplement = useCallback(async (id) => {
    const response = await fetch(`${API_BASE}/supplements/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to delete supplement');
    }
    setSupplements(prev => prev.filter(s => (s._id !== id && s.id !== id)));
    return true;
  }, []);

  return {
    supplements,
    loading,
    error,
    fetchSupplements,
    addSupplement,
    updateSupplement,
    deleteSupplement
  };
} 