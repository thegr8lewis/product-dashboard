'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { ShareDropdown } from './ShareDropdown';

export const ImageGallery = ({
  images,
  currentImageIndex,
  setCurrentImageIndex,
  isShareOpen,
  setIsShareOpen,
  isFavorite,
  setIsFavorite,
  productUrl
}: {
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
  isShareOpen: boolean;
  setIsShareOpen: (open: boolean) => void;
  isFavorite: boolean;
  setIsFavorite: (favorite: boolean) => void;
  productUrl: string;
}) => {
  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Product image ${currentImageIndex + 1}`}
            fill
            className="object-contain p-4 sm:p-6"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3">
            <motion.button
              onClick={prevImage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 focus:outline-none backdrop-blur-sm border border-gray-200 dark:border-gray-600"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </motion.button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
            <motion.button
              onClick={nextImage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 focus:outline-none backdrop-blur-sm border border-gray-200 dark:border-gray-600"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <motion.button
          onClick={() => setIsFavorite(!isFavorite)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-full shadow-lg backdrop-blur-sm border transition-all duration-200 ${
            isFavorite 
              ? 'bg-red-500 text-white border-red-500' 
              : 'bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800'
          }`}
          aria-label="Add to favorites"
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </motion.button>
      </div>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <motion.button
          onClick={() => setIsShareOpen(!isShareOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 focus:outline-none backdrop-blur-sm border border-gray-200 dark:border-gray-600"
          aria-label="Share product"
        >
          <Share2 size={18} />
        </motion.button>
      </div>
      <ShareDropdown isOpen={isShareOpen} productUrl={productUrl} />
    </div>
  );
};