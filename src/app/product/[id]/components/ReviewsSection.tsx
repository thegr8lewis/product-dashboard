import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

type Review = {
  rating?: number;
  date?: string;
  reviewerName?: string;
  comment?: string;
};

export const ReviewsSection = ({
  reviews = []
}: {
  reviews?: Review[];
}) => {
  if (reviews.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12 lg:mt-16"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Customer Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 6).map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < (review.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {review.date ? new Date(review.date).toLocaleDateString() : 'No date'}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {review.reviewerName || 'Anonymous'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {review.comment || 'No comment provided'}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};