import { Star } from 'lucide-react';

export const ProductHeader = ({
  brand,
  title,
  rating,
  availabilityStatus
}: {
  brand: string;
  title: string;
  rating: number;
  availabilityStatus: string;
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide">
        {brand}
      </span>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1" aria-label={`Rating: ${rating.toFixed(1)} out of 5`}>
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {rating.toFixed(1)}
          </span>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          availabilityStatus === 'In Stock' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        }`}>
          {availabilityStatus}
        </span>
      </div>
    </div>
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
      {title}
    </h1>
  </div>
);