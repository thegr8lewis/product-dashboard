import { Truck, RotateCw } from 'lucide-react';

export const ShippingInfo = ({
  shippingInformation,
  returnPolicy
}: {
  shippingInformation?: string;
  returnPolicy?: string;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        <Truck className="h-4 w-4" />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {shippingInformation || 'Standard Shipping'}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Free delivery on orders over $50
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
        <RotateCw className="h-4 w-4" />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {returnPolicy || '30-day returns'}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Easy returns & exchanges
        </p>
      </div>
    </div>
  </div>
);