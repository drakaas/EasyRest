import { useEffect, useState } from 'react';

/**
 * Toast notification component
 * @param {Object} props
 * @param {Object} props.toast - Toast data
 * @param {Function} props.onClose - Function to call when toast is closed
 */
export default function Toast({ toast, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (toast) {
      // Trigger animation by setting visible after a small delay
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [toast]);
  
  if (!toast) return null;
  
  // Map toast type to styles
  const typeStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-blue-500'
  };
  
  // Map toast type to icon
  const typeIcons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };
  
  const bgColor = typeStyles[toast.type] || typeStyles.info;
  const icon = typeIcons[toast.type] || typeIcons.info;
  
  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${bgColor}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <p>{toast.message}</p>
      <button
        className="ml-4 text-white/80 hover:text-white"
        onClick={onClose}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
} 