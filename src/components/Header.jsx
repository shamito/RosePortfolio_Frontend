import React, { useState } from 'react';
import logo from '/assets/img/Rose_logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src={logo}
                alt="Logo" 
                className="mt-10 h-25 w-auto"
              />
            </a>
          </div>
          
          {/* Desktop Navigation Links - Right Side */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <a
              href="#"
              className="text-gray-900 border-b-2 border-blue-500 px-1 pt-1 text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 text-sm font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 text-sm font-medium transition-colors"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 text-sm font-medium transition-colors"
            >
              Contact
            </a>
            
            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>Account</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sign In
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sign Up
                  </a>
                  <div className="border-t border-gray-200"></div>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Settings
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden bg-white">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Home
            </a>
            <a href="#" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors">
              About
            </a>
            <a href="#" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors">
              Services
            </a>
            <a href="#" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors">
              Contact
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1 px-2">
              <a href="#" className="w-full text-left text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Sign In
              </a>
              <a href="#" className="w-full text-left text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Sign Up
              </a>
              <a href="#" className="w-full text-left text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Profile
              </a>
              <a href="#" className="w-full text-left text-gray-700 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Settings
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}