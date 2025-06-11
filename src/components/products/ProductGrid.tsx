
// src/components/products/ProductGrid.tsx
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryFilter } from './CategoryFilter';
import { useState, useEffect } from 'react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ProductGrid({ products, isLoading, error, onRetry }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Extract unique categories and format as objects
  const categories = [...new Set(products.map((p) => p.category))].map((category) => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
  }));

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Debug: Log category changes
  useEffect(() => {
    console.log('Selected category:', selectedCategory);
    console.log('Filtered products count:', filteredProducts.length);
  }, [selectedCategory, filteredProducts]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="max-w-xs">
          <CategoryFilter
            categories={[]}
            selectedCategory=""
            onCategoryChange={() => {}}
            isLoading={true}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ErrorMessage message={error || 'Unable to load products'} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="max-w-xs">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="text-gray-500 dark:text-gray-400 text-lg font-semibold mb-2">
            No products found
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-center">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}