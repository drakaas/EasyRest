import { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/ui/Toast';

// Create context
const ToastContext = createContext();

/**
 * Provider component that wraps the app and makes toast functions available
 */
export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} type - The type of toast (success, error, info, warning)
   * @param {number} duration - Duration in ms to show the toast, 0 for no auto-dismiss
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
   * Hide the current toast
   */
  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Value to be provided to consumers
  const value = {
    toast,
    showToast,
    hideToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toast={toast} onClose={hideToast} />
    </ToastContext.Provider>
  );
}

/**
 * Custom hook to use the toast context
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastContext; 