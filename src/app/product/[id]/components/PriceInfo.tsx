export const PriceInfo = ({
  price,
  discountPercentage
}: {
  price: number;
  discountPercentage: number;
}) => {
  const discountedPrice = price - (price * (discountPercentage / 100));

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="flex items-center gap-3">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          ${discountedPrice.toFixed(2)}
        </p>
        {discountPercentage > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-lg text-gray-500 line-through dark:text-gray-400">
              ${price.toFixed(2)}
            </span>
            <span className="text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full">
              {discountPercentage}% OFF
            </span>
          </div>
        )}
      </div>
    </div>
  );
};