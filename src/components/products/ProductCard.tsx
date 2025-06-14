
// import { Product } from '@/types';
// import { Star, ShoppingCart, Heart, Zap } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const discountedPrice = product.price * (1 - product.discountPercentage / 100);
//   const isNew = product.createdAt && new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

//   return (
//     <Link href={`/product/${product.id}`} className="group block w-full">
//       <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600">
//         {/* Image Container - Modern gradient background */}
//         <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
//           <Image
//             src={product.thumbnail}
//             alt={product.title}
//             fill
//             className="object-cover group-hover:scale-110 transition-transform duration-500"
//             sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
//           />
          
//           {/* Badges - Modern glass-morphism style */}
//           <div className="absolute top-3 left-3 flex gap-2">
//             {product.discountPercentage > 0 && (
//               <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg backdrop-blur-sm">
//                 <Zap className="h-3 w-3 mr-1" />
//                 {Math.round(product.discountPercentage)}%
//               </span>
//             )}
//             {isNew && (
//               <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
//                 NEW
//               </span>
//             )}
//           </div>
          
//           {/* Quick Actions - Glass-morphism buttons */}
//           <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//             <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 border border-gray-200/50 dark:border-gray-600/50">
//               <Heart className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
//             </button>
//             <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 border border-gray-200/50 dark:border-gray-600/50">
//               <ShoppingCart className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors" />
//             </button>
//           </div>
//         </div>

//         {/* Content - Modern spacing and typography */}
//         <div className="p-4">
//           {/* Brand & Rating Row */}
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
//               {product.brand}
//             </span>
            
//             <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-full">
//               <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//               <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
//                 {product.rating.toFixed(1)}
//               </span>
//             </div>
//           </div>
          
//           {/* Title - Clean typography */}
//           <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-3 leading-tight">
//             {product.title}
//           </h3>
          
//           {/* Price Row - Adaptive layout */}
//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-baseline gap-1.5 min-w-0 flex-1">
//               <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
//                 ${discountedPrice.toFixed(2)}
//               </span>
//               {product.discountPercentage > 0 && (
//                 <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 line-through flex-shrink-0">
//                   ${product.price.toFixed(2)}
//                 </span>
//               )}
//             </div>
            
//             {/* Stock Status - Adaptive badge */}
//             <span className={`text-xs px-1.5 sm:px-2 py-1 rounded-full font-medium border flex-shrink-0 whitespace-nowrap ${
//               product.stock > 10 
//                 ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
//                 : product.stock > 0
//                 ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
//                 : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
//             }`}>
//               {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }

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
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600">
        {/* Image Container - Modern gradient background */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
          />
          
          {/* Badges - Modern glass-morphism style */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.discountPercentage > 0 && (
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg backdrop-blur-sm">
                <Zap className="h-3 w-3 mr-1" />
                {Math.round(product.discountPercentage)}%
              </span>
            )}
            {isNew && (
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
                NEW
              </span>
            )}
          </div>
          
          {/* Quick Actions - Glass-morphism buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 border border-gray-200/50 dark:border-gray-600/50">
              <Heart className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors" />
            </button>
            <button className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110 border border-gray-200/50 dark:border-gray-600/50">
              <ShoppingCart className="h-4 w-4 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors" />
            </button>
          </div>
        </div>

        {/* Content - Modern spacing and typography */}
        <div className="p-4">
          {/* Brand & Rating Row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
              {product.brand}
            </span>
            
            <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
          
          {/* Title - Clean typography */}
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-3 leading-tight">
            {product.title}
          </h3>
          
          {/* Price Row - Adaptive layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-baseline gap-1.5 min-w-0 flex-1">
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 line-through flex-shrink-0">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock Status - Adaptive badge */}
            <span className={`text-xs px-2 py-1 rounded-full font-medium border flex-shrink-0 whitespace-nowrap self-start sm:self-auto ${
              product.stock > 10 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
                : product.stock > 0
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
            }`}>
              {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}