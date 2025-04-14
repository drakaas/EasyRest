// components/Footer.tsx
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-4 gap-8 px-14">
        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">Get exclusive deals and updates on new menu items.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500 w-full text-sm" 
            />
            <button className="bg-purple-600 px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Opening Hours</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
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
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/about" className="hover:text-purple-400 transition-colors">About Us</a></li>
            <li><a href="/menu" className="hover:text-purple-400 transition-colors">Menu</a></li>
            <li><a href="/locations" className="hover:text-purple-400 transition-colors">Locations</a></li>
            <li><a href="/catering" className="hover:text-purple-400 transition-colors">Catering</a></li>
            <li><a href="/careers" className="hover:text-purple-400 transition-colors">Careers</a></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-brands fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-brands fa-youtube text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
  );
};