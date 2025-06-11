// src/components/products/CategoryFilter.tsx

import { ChevronDown, Filter } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  isLoading = false,
  className = "" 
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  };

  const displayValue = selectedCategory === '' 
    ? 'All Categories' 
    : formatCategoryName(selectedCategory);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center justify-between w-full px-4 py-3 
                   border border-gray-300 dark:border-gray-600 rounded-lg
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                   hover:bg-gray-50 dark:hover:bg-gray-700
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
      >
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium">
            {isLoading ? 'Loading...' : displayValue}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 
                     ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-1 
                        bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                        rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          
          {/* All Categories Option */}
          <button
            onClick={() => handleCategorySelect('')}
            className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 
                       transition-colors border-b border-gray-100 dark:border-gray-700
                       ${selectedCategory === '' 
                         ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                         : 'text-gray-900 dark:text-white'}`}
          >
            All Categories
          </button>

          {/* Category Options */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 
                         transition-colors
                         ${selectedCategory === category 
                           ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' 
                           : 'text-gray-900 dark:text-white'}`}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      )}

      {/* Active filter indicator */}
      {selectedCategory && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
      )}
    </div>
  );
}