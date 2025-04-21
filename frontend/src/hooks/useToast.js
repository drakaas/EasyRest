import { useState, useCallback } from 'react';

/**
 * A custom hook for managing toast notifications
 * @returns {Object} Toast methods and state
 */
export function useToast() {
  const [toast, setToast] = useState(null);

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} type - The type of toast (success, error, info, warning)
   * @param {number} duration - Duration in ms to show the toast
   */
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    // Clear any existing toast
    setToast(null);
    
    // Set new toast after a brief delay to ensure animation
    setTimeout(() => {
      setToast({
        id: Date.now(),
        message,
        type,
        duration
      });
      
      // Auto dismiss
      if (duration > 0) {
        setTimeout(() => {
          setToast(null);
        }, duration);
      }
    }, 10);
  }, []);

  /**
   * Hide the toast
   */
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast
  };
}

export default useToast; 