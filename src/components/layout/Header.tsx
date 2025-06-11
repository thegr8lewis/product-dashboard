'use client';

import { ShoppingBag, User } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <h1 className="text-xl font-bold text-white">
              Product Dashboard
            </h1>
          </div>

          {/* User icon */}
          <button
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="User profile"
          >
            <User className="h-5 w-5 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
}