import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProductManagement from '../../components/admin/ProductManagement';
import CategoryManagement from '../../components/admin/CategoryManagement';
import SupplementManagement from '../../components/admin/SupplementManagement';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showProductEditor, setShowProductEditor] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return <div className="flex justify-center items-center h-screen">Unauthorized access</div>;
  }

  const handleRefresh = () => {
    // Force refresh of data by manipulating component state
    setShowProductEditor(false);
    // This is a simple workaround - in a real app, you would call the API again
    window.location.reload();
  };

  const handleAddProduct = () => {
    setShowProductEditor(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <button 
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              onClick={handleAddProduct}
            >
              <span className="material-symbols-outlined">add</span>
              Add New Product
            </button>
            <button 
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={handleRefresh}
            >
              <span className="material-symbols-outlined">refresh</span>
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Category Management */}
          <div className="lg:col-span-1">
            <CategoryManagement />
          </div>
          
          {/* Product Management */}
          <div className="lg:col-span-2">
            <ProductManagement initialShowEditor={showProductEditor} />
            <SupplementManagement />
          </div>
        </div>
      </main>
    </div>
  );
} 