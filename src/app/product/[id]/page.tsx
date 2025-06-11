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
import { motion } from 'framer-motion';

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
        className="container mx-auto px-4 py-8"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Back to products"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="relative w-full h-96 md:h-[500px]">
            <Image
              src={images[currentImageIndex]}
              alt={`${product.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-contain rounded-lg"
              priority
            />
            {images.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={prevImage}
                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={nextImage}
                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 w-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
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
              <span className="text-sm text-gray-500 dark:text-gray-400">
                SKU: {product.sku || 'N/A'}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2" aria-label={`Rating: ${product.rating.toFixed(1)} out of 5`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                  <span className="text-gray-600 dark:text-gray-300">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  product.availabilityStatus === 'In Stock' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {product.availabilityStatus}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                  ${discountedPrice.toFixed(2)}
                </p>
                {product.discountPercentage > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded dark:bg-red-900 dark:text-red-200">
                      Save {product.discountPercentage}%
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Brand:</span>{' '}
                  {product.brand || 'N/A'}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Tag className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Category:</span>{' '}
                  {product.category || 'N/A'}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Stock:</span>{' '}
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Warranty:</span>{' '}
                  {product.warrantyInformation || 'No warranty'}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Shipping:</span>{' '}
                  {product.shippingInformation || 'Shipping information not available'}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <RotateCw className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-900 dark:text-white">Returns:</span>{' '}
                  {product.returnPolicy || 'No return policy'}
                </div>
              </div>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <h3 className="font-semibold text-lg mb-2">Product Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Weight:</span>{' '}
                  {product.weight ? `${product.weight} oz` : 'N/A'}
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Dimensions:</span>{' '}
                  {product.dimensions 
                    ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} in` 
                    : 'N/A'}
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Minimum Order:</span>{' '}
                  {product.minimumOrderQuantity || '1'}
                </div>
              </div>
            </div>

            {product.reviews && product.reviews.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Customer Reviews</h3>
                <div className="space-y-4">
                  {product.reviews.map((review, index) => {
                    // Parse date only once and format consistently
                    const reviewDate = new Date(review.date);
                    const formattedDate = `${reviewDate.getFullYear()}-${String(reviewDate.getMonth() + 1).padStart(2, '0')}-${String(reviewDate.getDate()).padStart(2, '0')}`;
                    
                    return (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{review.reviewerName}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formattedDate}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-medium"
              disabled={product.stock === 0}
              aria-disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}