// hooks/useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch("http://127.0.0.1:5000" + url, {
           ...options,
           credentials: 'include'  // This enables sending cookies/credentials
         });
         if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
         }
         const json = await response.json();
         console.log(json);
         setData(json);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     };
   
     fetchData(); // Don't forget to call it
   
   }, [ ]); // add dependencies
   
  return { data, loading, error };
}