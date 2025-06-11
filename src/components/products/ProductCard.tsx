// src/components/products/ProductCard.tsx
import { Product } from '@/types';
import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const isNew = product.createdAt && new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  return (
    <Link href={`/product/${product.id}`} className="group block w-full">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Image Container - Responsive height */}
        <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-700">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
          />
          
          {/* Badges - Responsive sizing */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {product.discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium flex items-center">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                {Math.round(product.discountPercentage)}%
              </span>
            )}
            {isNew && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-medium">
                NEW
              </span>
            )}
          </div>
          
          {/* Quick Actions - Responsive sizing */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white/90 dark:bg-slate-800/90 p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors">
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600 dark:text-slate-300" />
            </button>
            <button className="bg-white/90 dark:bg-slate-800/90 p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors">
              <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Content - Responsive padding and text sizing */}
        <div className="p-2 sm:p-3 md:p-4">
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
              {product.brand}
            </span>
            
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
              <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
          
          {/* Title - Responsive font size */}
          <h3 className="font-medium text-slate-900 dark:text-white text-sm sm:text-base line-clamp-2 mb-1 sm:mb-2 leading-snug">
            {product.title}
          </h3>
          
          {/* Price Row - Responsive sizing */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock Status - Responsive text size */}
            <span className={`text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium ${
              product.stock > 10 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                : product.stock > 0
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}