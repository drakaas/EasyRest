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

  // The following are placeholders for future POST/PUT/DELETE
  const addSupplement = useCallback(async (supplementData) => {
    // Implement POST to backend if needed
    throw new Error('Not implemented');
  }, []);

  const updateSupplement = useCallback(async (id, supplementData) => {
    // Implement PUT to backend if needed
    throw new Error('Not implemented');
  }, []);

  const deleteSupplement = useCallback(async (id) => {
    // Implement DELETE to backend if needed
    throw new Error('Not implemented');
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