import { Info, Tag, Package, Shield } from 'lucide-react';

export const ProductDetailsGrid = ({
  brand = 'N/A',
  category = 'N/A',
  stock = 0,
  warrantyInformation = 'No warranty',
  tags = []
}: {
  brand?: string;
  category?: string;
  stock?: number;
  warrantyInformation?: string;
  tags?: string[];
}) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          <Info className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Brand</span>
          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
            {brand}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          <Tag className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Category</span>
          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
            {category}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
          <Package className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Stock</span>
          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {stock > 0 ? `${stock} left` : 'Out of stock'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
          <Shield className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Warranty</span>
          <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
            {warrantyInformation}
          </p>
        </div>
      </div>
    </div>

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 6).map((tag) => (
          <span 
            key={tag}
            className="text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600"
          >
            #{tag}
          </span>
        ))}
      </div>
    )}
  </>
);