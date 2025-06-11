
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  isFiltering?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function ProductGrid({ 
  products, 
  isLoading, 
  isFiltering = false, 
  error, 
  onRetry 
}: ProductGridProps) {
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if ((isLoading || isFiltering) && products.length > 0) {
      setShowSkeleton(true);
      const timer = setTimeout(() => setShowSkeleton(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isFiltering, products.length]);

  if (showSkeleton) {
    return (
      <div className="space-y-4">
        <div className="text-right">
          <div className="h-5 w-24 bg-muted rounded animate-pulse inline-block" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.slice(0, 12).map((_, i) => (
            <motion.div
              key={`skeleton-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card rounded-xl shadow-sm overflow-hidden border animate-pulse"
            >
              <div className="aspect-square bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="flex justify-between">
                  <div className="h-5 bg-muted rounded w-1/4" />
                  <div className="h-4 bg-muted rounded w-1/5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {products.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`grid-${products.length}`}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
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