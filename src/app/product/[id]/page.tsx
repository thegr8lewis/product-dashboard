
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Layout } from '@/components/layout/Layout';
import { QRCodeModal } from './components/QRCodeModal';
import { ImageGallery } from './components/ImageGallery';
import { ProductHeader } from './components/ProductHeader';
import { PriceInfo } from './components/PriceInfo';
import { ProductDetailsGrid } from './components/ProductDetailsGrid';
import { ShippingInfo } from './components/ShippingInfo';
import { ReviewsSection } from './components/ReviewsSection';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { data: product, isLoading, error } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
    retry: 2,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading product details...</p>
          </div>
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
  const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/product/${id}`;

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pt-12"
      >
        <motion.button
          onClick={() => router.back()}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 sm:mb-8 transition-colors p-2 -ml-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
          aria-label="Back to products"
        >
          <ArrowLeft size={18} />
          <span className="text-sm sm:text-base"></span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <ImageGallery
            images={images}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
            isShareOpen={isShareOpen}
            setIsShareOpen={setIsShareOpen}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
            productUrl={productUrl}
          />

          <div className="flex flex-col gap-4 sm:gap-6">
            <ProductHeader
              brand={product.brand}
              title={product.title}
              rating={product.rating}
              availabilityStatus={product.availabilityStatus || 'Out of Stock'}
            />

            <PriceInfo
              price={product.price}
              discountPercentage={product.discountPercentage}
            />

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            <ProductDetailsGrid
              brand={product.brand}
              category={product.category}
              stock={product.stock}
              warrantyInformation={product.warrantyInformation}
              tags={product.tags}
            />

            <ShippingInfo
              shippingInformation={product.shippingInformation}
              returnPolicy={product.returnPolicy}
            />
          </div>
        </div>

        <ReviewsSection reviews={product.reviews} />
      </motion.div>

      <AnimatePresence>
        {isQRCodeOpen && (
          <QRCodeModal
            isOpen={isQRCodeOpen}
            onClose={() => setIsQRCodeOpen(false)}
            qrCodeUrl={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(productUrl)}`}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
