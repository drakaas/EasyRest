import React from "react";


export const Component = () => {
  return (
<div id="webcrumbs"> 
        	<div className="w-[1000px] bg-gray-50 font-sans font-inter antialiased">
	  {/* Device icons */}
	  <div className="flex justify-center gap-4 py-6">
	    <span  className="material-symbols-outlined">smartphone</span>
	    <span className="material-symbols-outlined">tablet</span>
	    <span className="material-symbols-outlined">laptop</span>
	  </div>
	
	  {/* Navbar */}
	  <div className="flex items-center justify-between px-14 py-4 border-b">
	    <div className="flex items-center">
	  <div className="text-purple-600 flex items-center mr-4">
	    <span className="material-symbols-outlined text-2xl">restaurant</span>
	    <span className="text-xl font-bold ml-2">FoodBay</span>
	  </div>
	  
	  <div className="flex gap-6 ml-8">
	    <a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-600 transition-colors">Dashboard</a>
	    <a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-600 transition-colors">Orders</a>
	    <a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-600 transition-colors">Menu</a>
	    <a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-600 transition-colors">Delivery</a>
	    <a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-600 transition-colors">Settings</a>
	  </div>
	</div>
	
	    <div className="flex items-center gap-4">
	      <a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-600 transition-transform hover:scale-110">
	        <span className="material-symbols-outlined">search</span>
	      </a>
	      <a href="https://webcrumbs.cloud/placeholder" className="relative hover:text-purple-600 transition-transform hover:scale-110">
	        <span  className="material-symbols-outlined">shopping_cart</span>
	        <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">2</span>
	      </a>
	      <a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-600 transition-transform hover:scale-110">
	        <span className="material-symbols-outlined">person</span>
	      </a>
	    </div>
	  </div>
	
	  {/* Food categories */}
	  
	
	  {/* Shopping Cart Section */}
	  
	
	<div className="px-14 py-6">
	  <div className="flex justify-between items-center mb-8">
	    
	<div className="text-2xl text-gray-700">Online Order Management</div>
	
	    <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
	      
	<button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
	  <span className="material-symbols-outlined">add</span>
	  New Order
	</button>
	
	      <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
	        <span className="material-symbols-outlined">refresh</span>
	        Refresh
	      </button>
	    </div>
	  </div>
	
	  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10">
	    {/* Order Statistics */}
	    <div className="col-span-4 bg-white rounded-lg shadow-md p-6">
	      <h3 className="text-xl font-medium mb-4 text-gray-800 tracking-tight">Order Overview</h3>
	      
	<div className="mb-5 grid grid-cols-2 gap-4">
	  <div className="bg-purple-50 p-4 rounded-lg">
	    <div className="text-purple-600 text-3xl font-bold">26</div>
	    <div className="text-gray-600 text-xs sm:text-sm font-medium">Active Orders</div>
	  </div>
	  <div className="bg-green-50 p-4 rounded-lg">
	    <div className="text-green-600 text-3xl font-bold">15</div>
	    <div className="text-gray-600 text-xs sm:text-sm font-medium">Completed Today</div>
	  </div>
	  <div className="bg-blue-50 p-4 rounded-lg">
	    <div className="text-blue-600 text-2xl md:text-3xl font-bold leading-tight">8</div>
	    <div className="text-gray-600 text-xs sm:text-sm font-medium">Processing</div>
	  </div>
	  <div className="bg-yellow-50 p-4 rounded-lg">
	    <div className="text-yellow-600 text-2xl md:text-3xl font-bold leading-tight">$1.8k</div>
	    <div className="text-gray-600 text-xs sm:text-sm font-medium">Today's Revenue</div>
	  </div>
	</div>
	
	      
	      <div  className="bg-white border border-gray-200 rounded-lg p-4 mb-5">
	        <h4 className="font-medium text-base mb-3">Order Volume</h4>
	        <div className="h-[200px] relative overflow-hidden">
	          <div className="absolute inset-0 flex items-end justify-between px-2">
	            <div className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md h-[30%]"></div>
	            <div className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md h-[70%]"></div>
	            <div className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md h-[45%]"></div>
	            <div className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md h-[80%]"></div>
	            <div className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md h-[65%]"></div>
	            <div className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md h-[50%]"></div>
	            <div className="w-[30px] bg-purple-400 hover:bg-purple-500 transition-all rounded-t-md h-[90%]"></div>
	          </div>
	          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 pt-2 flex items-center justify-between px-2 text-xs text-gray-500">
	            <div>Mon</div>
	            <div>Tue</div>
	            <div>Wed</div>
	            <div>Thu</div>
	            <div>Fri</div>
	            <div>Sat</div>
	            <div>Sun</div>
	          </div>
	        </div>
	        <div className="text-xs text-gray-500 text-center mt-2">Orders - Last 7 Days</div>
	      </div>
	      
	      
	<div className="bg-white border border-gray-200 rounded-lg p-4">
	  <h4 className="font-medium text-base mb-3">Order Distribution</h4>
	  <div className="flex items-center gap-2 mb-2">
	    <div className="w-full bg-gray-200 rounded-full h-2.5">
	      <div className="bg-purple-600 h-2.5 rounded-full w-[45%]"></div>
	    </div>
	    <span className="text-xs text-gray-600">45%</span>
	  </div>
	  <div className="text-xs text-gray-500 mb-4 font-medium">Mobile App</div>
	  
	  <div className="flex items-center gap-2 mb-2">
	    <div className="w-full bg-gray-200 rounded-full h-2.5">
	      <div className="bg-blue-500 h-2.5 rounded-full w-[35%]"></div>
	    </div>
	    <span className="text-xs text-gray-600">35%</span>
	  </div>
	  <div className="text-xs text-gray-500 mb-4">Website</div>
	  
	  <div className="flex items-center gap-2 mb-2">
	    <div className="w-full bg-gray-200 rounded-full h-2.5">
	      <div className="bg-yellow-500 h-2.5 rounded-full w-[20%]"></div>
	    </div>
	    <span className="text-xs text-gray-600">20%</span>
	  </div>
	  <div className="text-xs text-gray-500">Third-party Apps</div>
	</div>
	
	    </div>
	    
	    {/* Order Management */}
	    <div className="col-span-8 bg-white rounded-lg shadow-md p-6">
	      
	<div className="text-xl font-medium mb-4">Online Orders</div>
	
	      
	      <div className="mb-8">
	        <div className="flex items-center gap-3 mb-4 flex-wrap sm:flex-nowrap">
	          <div className="relative w-full sm:w-auto">
	            <input placeholder="Search orders..." className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all w-full sm:w-72 text-base" />
	            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
	          </div>
	          <select className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
	            <option>All Orders</option>
	            <option>Pending</option>
	            <option>Preparing</option>
	            <option>Ready</option>
	            <option>Delivered</option>
	            <option>Cancelled</option>
	          </select>
	          <div className="flex-1"></div>
	          <div className="flex items-center gap-2">
	            <span className="text-sm text-gray-500">Sort by:</span>
	            <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all w-full">
	              <option>Newest</option>
	              <option>Table Number</option>
	              <option>Status</option>
	              <option>Amount</option>
	            </select>
	          </div>
	        </div>
	      </div>
	      
	      {/* Order Detail Panel */}
	      <div className="border border-gray-200 rounded-lg p-4 mb-6 overflow-hidden">
	        <div className="flex flex-col md:flex-row gap-6">
	          {/* Order Info */}
	          <div className="w-full lg:w-48 mb-4 lg:mb-0">
	            <div className="rounded-lg h-auto flex flex-col items-center justify-center p-4 relative bg-gray-100">
	              <span className="material-symbols-outlined text-5xl text-purple-600 mb-2">receipt_long</span>
	              <div className="mt-2 text-center font-medium text-xl">#ORD-5782</div>
	              <div className="text-sm text-gray-500 text-center mt-1">Today, 12:45 PM</div>
	              <div className="mt-3 w-full">
	                <span className="inline-flex items-center justify-center w-full px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
	                  Preparing
	                </span>
	              </div>
	            </div>
	            
	<div className="mt-4 space-y-2 text-center">
	  <div className="text-base font-medium">Order #5782</div>
	  <div className="text-sm text-gray-500">Standard Delivery</div>
	</div>
	
	          </div>
	          
	          {/* Order Details */}
	          <div className="flex-1 space-y-4 overflow-hidden md:overflow-visible">
	            <div className="flex items-center justify-between mb-4">
	              <h4 className="font-medium text-lg">Order Details</h4>
	              <div className="flex items-center gap-2">
	                <button className="p-2 hover:bg-gray-100 rounded transition-colors text-green-600">
	                  <span className="material-symbols-outlined">done</span>
	                </button>
	                <button className="p-2 hover:bg-gray-100 rounded transition-colors text-red-600">
	                  <span className="material-symbols-outlined">close</span>
	                </button>
	                <button className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-600">
	                  <span className="material-symbols-outlined">print</span>
	                </button>
	              </div>
	            </div>
	            
	            <div className="bg-gray-50 rounded-lg p-4 mb-4">
	              <label className="block text-sm text-gray-600 mb-2 font-medium">Customer</label>
	              <div className="text-sm font-medium text-gray-800 flex items-center">
	                <span className="material-symbols-outlined mr-2 text-gray-500">person</span>
	                James Wilson
	              </div>
	            </div>
	            
	            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
	              
	<div className="bg-gray-50 p-4 rounded-lg">
	  <div className="text-gray-600 text-sm mb-1">Delivery Instructions:</div>
	  <div className="text-sm font-medium text-gray-800">Please leave order at the door. Call when arriving. Extra ketchup for the fries.</div>
	</div>
	
	              
	<div className="bg-gray-50 p-4 rounded-lg">
	  <div className="text-gray-600 text-sm mb-1">Delivery Method:</div>
	  <div className="text-sm font-medium text-gray-800 flex items-center">
	    <span className="material-symbols-outlined mr-2 text-blue-500">local_shipping</span>
	    Standard Delivery (30-45 min)
	  </div>
	</div>
	
	            </div>
	            
	            <div className="border border-gray-200 rounded-lg">
	              <div className="p-4 border-b">
	                <h5 className="font-medium">Order Items</h5>
	              </div>
	              
	<div className="divide-y divide-gray-100">
	  <div className="p-4 flex justify-between items-center">
	    <div className="flex items-center">
	      <div className="mr-4 bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
	        <span className="material-symbols-outlined">lunch_dining</span>
	      </div>
	      <div>
	        <div className="font-medium">Ribeye Steak</div>
	        <div className="text-sm text-gray-500">Medium-rare, Side of fries</div>
	      </div>
	    </div>
	    <div className="text-right">
	      <div className="font-medium">$32.99</div>
	      <div className="text-sm text-gray-500">Qty: 1</div>
	    </div>
	  </div>
	  <div className="p-4 flex justify-between items-center">
	    <div className="flex items-center">
	      <div className="mr-4 bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
	        <span className="material-symbols-outlined">local_bar</span>
	      </div>
	      <div>
	        <div className="font-medium">House Red Wine</div>
	        <div className="text-sm text-gray-500">Glass</div>
	      </div>
	    </div>
	    <div className="text-right">
	      <div className="font-medium">$8.50</div>
	      <div className="text-sm text-gray-500">Qty: 1</div>
	    </div>
	  </div>
	  <div className="p-4 flex justify-between items-center">
	    <div className="flex items-center">
	      <div className="mr-4 bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
	        <span className="material-symbols-outlined">cake</span>
	      </div>
	      <div>
	        <div className="font-medium">Chocolate Lava Cake</div>
	        <div className="text-sm text-gray-500">With vanilla ice cream</div>
	      </div>
	    </div>
	    <div className="text-right">
	      <div className="font-medium">$7.99</div>
	      <div className="text-sm text-gray-500">Qty: 1</div>
	    </div>
	  </div>
	</div>
	
	              
	<div className="p-4 border-t bg-gray-50">
	  <div className="flex justify-between mb-1">
	    <div className="text-gray-600">Subtotal</div>
	    <div className="font-medium">$49.48</div>
	  </div>
	  <div className="flex justify-between mb-1">
	    <div className="text-gray-600">Tax (8.5%)</div>
	    <div className="font-medium">$4.21</div>
	  </div>
	  <div  className="flex justify-between mb-1">
	    <div className="text-gray-600">Delivery Fee</div>
	    <div className="font-medium">$3.99</div>
	  </div>
	  <div className="flex justify-between pt-2 border-t mt-2">
	    <div className="text-gray-800 font-medium">Total</div>
	    <div className="font-bold text-lg">$57.68</div>
	  </div>
	</div>
	
	            </div>
	          </div>
	        </div>
	        
	        <div className="mt-6 border-t border-gray-200 pt-4">
	          <div className="flex items-center justify-between mb-3">
	            <h4 className="font-medium">Order Timeline</h4>
	          </div>
	          
	          <div className="space-y-4 max-h-[200px] overflow-auto pr-2">
	            
	<div className="flex">
	  <div className="flex flex-col items-center mr-4">
	    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
	    <div className="w-0.5 h-full bg-gray-200"></div>
	  </div>
	  <div className="flex-1 pb-4">
	    <div className="text-sm font-medium">Order received</div>
	    <div className="text-xs text-gray-500">Today, 12:30 PM</div>
	  </div>
	</div>
	
	            
	<div className="flex">
	  <div className="flex flex-col items-center mr-4">
	    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
	    <div className="w-0.5 h-full bg-gray-200"></div>
	  </div>
	  <div className="flex-1 pb-4">
	    <div className="text-sm font-medium">Payment confirmed</div>
	    <div className="text-xs text-gray-500">Today, 12:32 PM</div>
	  </div>
	</div>
	
	            
	<div className="flex">
	  <div className="flex flex-col items-center mr-4">
	    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
	    <div className="w-0.5 h-full bg-gray-200"></div>
	  </div>
	  <div className="flex-1 pb-4">
	    <div className="text-sm font-medium">Processing order</div>
	    <div className="text-xs text-gray-500">Today, 12:36 PM</div>
	  </div>
	</div>
	
	            
	<div className="flex">
	  <div className="flex flex-col items-center mr-4">
	    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
	    <div  className="w-0.5 h-full bg-gray-200"></div>
	  </div>
	  <div className="flex-1 pb-4">
	    <div className="text-sm font-medium text-gray-500">Out for delivery</div>
	    <div className="text-xs text-gray-500">Estimated: 12:55 PM</div>
	  </div>
	</div>
	<div  className="flex">
	  <div className="flex flex-col items-center mr-4">
	    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
	  </div>
	  <div className="flex-1">
	    <div className="text-sm font-medium text-gray-500">Delivered</div>
	    <div className="text-xs text-gray-500">Estimated: 1:15 PM</div>
	  </div>
	</div>
	
	
	          </div>
	        </div>
	      </div>
	      
	      {/* Order List */}
	      <div className="border border-gray-200 rounded-lg overflow-hidden">
	        <div className="grid grid-cols-12 gap-4 p-4 border-b text-gray-600 font-medium bg-gray-50">
	          <div className="col-span-2">Order ID</div>
	          
	<div className="col-span-2">Time</div>
	
	          <div  className="col-span-3">Customer</div>
	          
	<div className="col-span-2">Total</div>
	
	          
	<div className="col-span-2">Status</div>
	
	          <div className="col-span-1 text-center">Action</div>
	        </div>
	        
	        <div className="divide-y">
	          <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
	            <div className="col-span-2 font-medium">#ORD-5782</div>
	            <div className="col-span-2 text-sm text-gray-500">12:45 PM</div>
	            
	<div className="col-span-3 flex items-center">
	  <span className="material-symbols-outlined mr-2 text-gray-500">person</span>
	  <span>James Wilson</span>
	</div>
	
	            <div className="col-span-2 font-medium">$53.69</div>
	            
	<div className="col-span-2">
	  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
	    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
	    Processing
	  </span>
	</div>
	
	            <div className="col-span-1 flex justify-center">
	              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
	                <span className="material-symbols-outlined">more_vert</span>
	              </button>
	            </div>
	          </div>
	          
	          <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
	            <div className="col-span-2 font-medium">#ORD-5781</div>
	            <div className="col-span-2 text-sm text-gray-500">12:30 PM</div>
	            
	<div className="col-span-3 flex items-center">
	  <span className="material-symbols-outlined mr-2 text-gray-500">person</span>
	  <span>Sarah Miller</span>
	</div>
	
	            <div  className="col-span-2 font-medium">$42.15</div>
	            
	<div className="col-span-2">
	  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
	    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
	    Out for delivery
	  </span>
	</div>
	
	            <div  className="col-span-1 flex justify-center">
	              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
	                <span className="material-symbols-outlined">more_vert</span>
	              </button>
	            </div>
	          </div>
	          
	          <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
	            <div className="col-span-2 font-medium">#ORD-5780</div>
	            <div className="col-span-2 text-sm text-gray-500">12:15 PM</div>
	            
	<div className="col-span-3 flex items-center">
	  <span className="material-symbols-outlined mr-2 text-gray-500">person</span>
	  <span>Robert Chen</span>
	</div>
	
	            <div className="col-span-2 font-medium">$27.50</div>
	            
	<div className="col-span-2">
	  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
	    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1.5"></span>
	    New Order
	  </span>
	</div>
	
	            <div className="col-span-1 flex justify-center">
	              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
	                <span className="material-symbols-outlined">more_vert</span>
	              </button>
	            </div>
	          </div>
	          
	          <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
	            <div className="col-span-2 font-medium">#ORD-5779</div>
	            <div className="col-span-2 text-sm text-gray-500">12:00 PM</div>
	            
	<div className="col-span-3 flex items-center">
	  <span className="material-symbols-outlined mr-2 text-gray-500">person</span>
	  <span>Emily Davis</span>
	</div>
	
	            <div className="col-span-2 font-medium">$63.25</div>
	            
	<div className="col-span-2">
	  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
	    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
	    Delivered
	  </span>
	</div>
	
	            <div className="col-span-1 flex justify-center">
	              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
	                <span  className="material-symbols-outlined">more_vert</span>
	              </button>
	            </div>
	          </div>
	        </div>
	        
	        <div className="p-4 flex justify-between items-center border-t bg-gray-50">
	          <div className="text-sm text-gray-500 font-medium">Showing 4 of 26 orders</div>
	          <div className="flex items-center gap-2">
	            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
	              <span className="material-symbols-outlined">chevron_left</span>
	            </button>
	            <button className="w-9 h-9 bg-purple-600 text-white rounded-md flex items-center justify-center hover:bg-purple-700 transition-colors">1</button>
	            <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">2</button>
	            <button className="w-9 h-9 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">3</button>
	            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
	              <span className="material-symbols-outlined">chevron_right</span>
	            </button>
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>
	
	
	
	
	  {/* Footer */}
	  <footer className="bg-gray-900 text-white py-10">
	    <div  className="container mx-auto grid grid-cols-4 gap-8 px-14">
	      {/* Newsletter */}
	      <div>
	        <h3 className="font-semibold text-lg mb-4">Subscribe to Our Newsletter</h3>
	        <p className="text-gray-400 text-sm mb-4">Get exclusive deals and updates on new menu items.</p>
	        <div className="flex">
	          <input className="px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500 w-full text-sm" />
	          <button className="bg-purple-600 px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors">Subscribe</button>
	        </div>
	      </div>
	
	      {/* Opening Hours */}
	      
	<div>
	  <h3 className="font-semibold text-lg mb-4">Delivery Hours</h3>
	  <ul className="space-y-3 text-gray-400 text-sm">
	    <li className="flex justify-between">
	      <span>Monday - Friday</span>
	      <span>9:00 AM - 10:00 PM</span>
	    </li>
	    <li className="flex justify-between">
	      <span>Saturday</span>
	      <span>10:00 AM - 11:00 PM</span>
	    </li>
	    <li className="flex justify-between">
	      <span>Sunday</span>
	      <span>10:00 AM - 9:00 PM</span>
	    </li>
	  </ul>
	</div>
	
	      {/* Quick Links */}
	      <div>
	        <h3  className="font-semibold text-lg mb-4">Quick Links</h3>
	        <ul className="space-y-3 text-gray-400 text-sm">
	          <li><a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-400 transition-colors">About Us</a></li>
	          <li><a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-400 transition-colors">Menu</a></li>
	          <li><a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-400 transition-colors">Locations</a></li>
	          <li  ><a href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-400 transition-colors">Catering</a></li>
	          <li><a   href="https://webcrumbs.cloud/placeholder" className="hover:text-purple-400 transition-colors">Careers</a></li>
	        </ul>
	      </div>
	
	      {/* Connect With Us */}
	      <div>
	        <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
	        <div className="flex space-x-4 mb-4">
	          <a  href="https://webcrumbs.cloud/placeholder" className="text-gray-400 hover:text-white transition-colors">
	            <i className="fa-brands fa-facebook text-xl"></i>
	          </a>
	          <a href="https://webcrumbs.cloud/placeholder" className="text-gray-400 hover:text-white transition-colors">
	            <i className="fa-brands fa-twitter text-xl"></i>
	          </a>
	          <a href="https://webcrumbs.cloud/placeholder" className="text-gray-400 hover:text-white transition-colors">
	            <i className="fa-brands fa-instagram text-xl"></i>
	          </a>
	          <a href="https://webcrumbs.cloud/placeholder" className="text-gray-400 hover:text-white transition-colors">
	            <i className="fa-brands fa-youtube text-xl"></i>
	          </a>
	          <a   href="https://webcrumbs.cloud/placeholder" className="text-gray-400 hover:text-white transition-colors">
	            <i className="fa-brands fa-tiktok text-xl"></i>
	          </a>
	        </div>
	        <p className="text-gray-400 text-sm">Visit our main website: <a href="https://foodbay.com" className="text-purple-400 hover:underline">foodbay.com</a></p>
	      </div>
	    </div>
	
	    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm px-14">
	      <p>© 2023 FoodBay. All rights reserved.</p>
	    </div>
	  </footer>
	</div> 
        </div>
  )
}

