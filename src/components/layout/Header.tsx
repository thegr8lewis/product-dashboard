// components/layout/Header.tsx
'use client';

import { ShoppingBag } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4 group">
            {/* Gradient colorful shopping bag icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-900 via-pink-400 to-orange-500 p-3 rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <ShoppingBag className="h-5 w-8 text-white" aria-hidden="true" />
              </div>
            </div>
            
            {/* Modern typography with gradient text */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-tight tracking-tight">
                Product Dashboard
              </h1>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80 group-hover:w-24 transition-all duration-300"></div>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}