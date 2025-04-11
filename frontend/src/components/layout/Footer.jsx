export default function Footer() {
     return (
       <footer className="bg-neutral-800 text-white pt-10 pb-6 px-8">
	    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
	      <div className="space-y-4">
	        <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
	        <p className="text-neutral-300 text-sm">Get exclusive deals and updates on new menu items.</p>
	        <div className="flex flex-col sm:flex-row gap-2">
	          <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-lg bg-neutral-700 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full" />
	          <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap">
	            Subscribe
	          </button>
	        </div>
	      </div>
	      
	      <div className="space-y-4">
	        <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
	        <ul className="space-y-2 text-neutral-300">
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
	      
	      <div className="space-y-4">
	        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
	        <ul className="space-y-2">
	          <li><a href="https://webcrumbs.cloud/placeholder" className="text-neutral-300 hover:text-primary-400 transition-colors duration-200">About Us</a></li>
	          <li><a href="https://webcrumbs.cloud/placeholder" className="text-neutral-300 hover:text-primary-400 transition-colors duration-200">Menu</a></li>
	          <li><a href="https://webcrumbs.cloud/placeholder" className="text-neutral-300 hover:text-primary-400 transition-colors duration-200">Locations</a></li>
	          <li><a href="https://webcrumbs.cloud/placeholder" className="text-neutral-300 hover:text-primary-400 transition-colors duration-200">Catering</a></li>
	          <li><a href="https://webcrumbs.cloud/placeholder" className="text-neutral-300 hover:text-primary-400 transition-colors duration-200">Careers</a></li>
	        </ul>
	      </div>
	      
	      <div className="space-y-4">
	        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
	        <div className="flex space-x-4">
	          <a href="https://webcrumbs.cloud/placeholder" className="bg-neutral-700 hover:bg-primary-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
	            <span className="material-symbols-outlined">facebook</span>
	          </a>
	          <a href="https://webcrumbs.cloud/placeholder" className="bg-neutral-700 hover:bg-primary-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
	            <span className="material-symbols-outlined">tweet</span>
	          </a>
	          <a href="https://webcrumbs.cloud/placeholder" className="bg-neutral-700 hover:bg-primary-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
	            <span className="material-symbols-outlined">photo_camera</span>
	          </a>
	          <a href="https://webcrumbs.cloud/placeholder" className="bg-neutral-700 hover:bg-primary-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200">
	            <span className="material-symbols-outlined">alternate_email</span>
	          </a>
	        </div>
	        <p className="text-neutral-300 text-sm pt-4">Visit our main website: <a href="https://foodbay.com" className="text-primary-400 hover:underline transition-colors duration-200">foodbay.com</a></p>
	      </div>
	    </div>
	    <div className="border-t border-neutral-700 mt-8 pt-6 text-center text-neutral-400 text-sm">
	      <p>&copy; {new Date().getFullYear()} FoodBay. All rights reserved.</p>
	    </div>
	  
       </footer>
     )
   }