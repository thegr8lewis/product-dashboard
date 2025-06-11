// src/app/product/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Layout } from '@/components/layout/Layout';
import { Star, ArrowLeft, ChevronLeft, ChevronRight, Info, Shield, Truck, Package, RotateCw, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading, error } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
    retry: 2,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <ErrorMessage
          message={error?.message || 'Product not found'}
          onRetry={() => router.refresh()}
        />
      </Layout>
    );
  }

  const images = [product.thumbnail, ...(product.images || [])].filter(Boolean);
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Calculate discounted price
  const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-15"
      >
        <motion.button
          onClick={() => router.back()}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
          aria-label="Back to products"
        >
          <ArrowLeft size={20} />
          
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="relative w-full aspect-square rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`${product.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain p-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
            
            {images.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <motion.button
                    onClick={prevImage}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white focus:outline-none backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <motion.button
                    onClick={nextImage}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white focus:outline-none backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {product.brand}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-1">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mt-3">
                <div 
                  className="flex items-center gap-1.5" 
                  aria-label={`Rating: ${product.rating.toFixed(1)} out of 5`}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  product.availabilityStatus === 'In Stock' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {product.availabilityStatus}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  ${discountedPrice.toFixed(2)}
                </p>
                {product.discountPercentage > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Brand:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">{product.brand || 'N/A'}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Tag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Category:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">{product.category || 'N/A'}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Package className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Stock:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Shield className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Warranty:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.warrantyInformation || 'No warranty'}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Truck className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Shipping:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.shippingInformation || 'Shipping information not available'}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <RotateCw className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Returns:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.returnPolicy || 'No return policy'}
                  </span>
                </div>
              </div>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <motion.span 
                    key={tag}
                    whileHover={{ y: -2 }}
                    className="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full dark:bg-gray-800 dark:text-gray-200"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 py-6">
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Weight:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.weight ? `${product.weight} ` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Dimensions:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.dimensions 
                      ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} in` 
                      : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Minimum Order:</span>{' '}
                  <span className="text-gray-600 dark:text-gray-300">
                    {product.minimumOrderQuantity || '1'}
                  </span>
                </div>
              </div>
            </div>

            {product.reviews && product.reviews.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Customer Reviews</h3>
                <div className="space-y-6">
                  {product.reviews.map((review, index) => {
                    const reviewDate = new Date(review.date);
                    const formattedDate = reviewDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    });
                    
                    return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{review.reviewerName}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formattedDate}
                          </span>
                        </div>
                        <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {review.comment}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}