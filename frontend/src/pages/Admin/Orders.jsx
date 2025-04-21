import React, { useState } from 'react';
import OrderStats from '../../components/admin/OrderStats';
import OrderList from '../../components/admin/OrderList';
import OrderDetail from '../../components/admin/OrderDetail';

// Mock data - replace with actual API calls
const mockStats = {
  activeOrders: 26,
  completedToday: 15,
  processing: 8,
  todayRevenue: '1.8k',
  volumeData: [30, 70, 45, 80, 65, 50, 90],
  orderDistribution: [
    { type: 'Mobile App', percentage: 45, color: 'purple' },
    { type: 'Website', percentage: 35, color: 'blue' },
    { type: 'Third-party Apps', percentage: 20, color: 'yellow' }
  ]
};

const mockOrders = [
  {
    id: 'ORD-5782',
    time: '12:45 PM',
    date: 'Today',
    customer: 'James Wilson',
    total: 57.68,
    status: { text: 'Preparing', color: 'yellow' },
    items: [
      {
        name: 'Ribeye Steak',
        description: 'Medium-rare, Side of fries',
        price: 32.99,
        quantity: 1,
        icon: 'lunch_dining'
      },
      {
        name: 'House Red Wine',
        description: 'Glass',
        price: 8.50,
        quantity: 1,
        icon: 'local_bar'
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'With vanilla ice cream',
        price: 7.99,
        quantity: 1,
        icon: 'cake'
      }
    ],
    deliveryMethod: 'Standard Delivery (30-45 min)',
    deliveryInstructions: 'Please leave order at the door. Call when arriving. Extra ketchup for the fries.',
    subtotal: 49.48,
    tax: 4.21,
    deliveryFee: 3.99,
    timeline: [
      { status: 'Order received', time: 'Today, 12:30 PM', completed: true },
      { status: 'Payment confirmed', time: 'Today, 12:32 PM', completed: true },
      { status: 'Processing order', time: 'Today, 12:36 PM', completed: true },
      { status: 'Out for delivery', time: 'Estimated: 12:55 PM', completed: false },
      { status: 'Delivered', time: 'Estimated: 1:15 PM', completed: false }
    ]
  },
  {
    id: 'ORD-5781',
    time: '12:30 PM',
    date: 'Today',
    customer: 'Sarah Miller',
    total: 42.15,
    status: { text: 'Out for delivery', color: 'blue' }
  },
  {
    id: 'ORD-5780',
    time: '12:15 PM',
    date: 'Today',
    customer: 'Robert Chen',
    total: 27.50,
    status: { text: 'New Order', color: 'purple' }
  },
  {
    id: 'ORD-5779',
    time: '12:00 PM',
    date: 'Today',
    customer: 'Emily Davis',
    total: 63.25,
    status: { text: 'Delivered', color: 'green' }
  }
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(mockOrders[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter orders based on search term and status
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || 
      order.status.text.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (orderId) => {
    const order = mockOrders.find(o => o.id === orderId);
    setSelectedOrder(order);
  };

  const handleCompleteOrder = (orderId) => {
    console.log('Complete order:', orderId);
  };

  const handleCancelOrder = (orderId) => {
    console.log('Cancel order:', orderId);
  };

  const handlePrintOrder = (orderId) => {
    console.log('Print order:', orderId);
  };

  const handleAddOrder = () => {
    console.log('Add new order');
  };

  const handleRefresh = () => {
    console.log('Refresh order list');
  };

  return (
    <div className="px-14 py-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-gray-700">Online Order Management</h2>
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          <button 
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            onClick={handleAddOrder}
          >
            <span className="material-symbols-outlined">add</span>
            New Order
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10">
        {/* Order Statistics - Left side */}
        <div className="lg:col-span-4 bg-white rounded-lg shadow-md p-6">
          <OrderStats stats={mockStats} />
        </div>
        
        {/* Order Management - Right side */}
        <div className="lg:col-span-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium mb-4">Online Orders</h3>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap sm:flex-nowrap">
              <div className="relative w-full sm:w-auto">
                <input 
                  placeholder="Search orders..." 
                  className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all w-full sm:w-72 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
              </div>
              <select 
                className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Orders</option>
                <option value="new order">New Order</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="out for delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="flex-1"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select 
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="customer">Customer</option>
                  <option value="status">Status</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Order Detail Panel */}
          {selectedOrder && (
            <OrderDetail 
              order={selectedOrder} 
              onComplete={handleCompleteOrder} 
              onCancel={handleCancelOrder} 
              onPrint={handlePrintOrder} 
            />
          )}
          
          {/* Order List */}
          <OrderList 
            orders={filteredOrders}
            onView={handleViewOrder}
            totalOrders={mockStats.activeOrders}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}