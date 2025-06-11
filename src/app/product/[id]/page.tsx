// // src/app/product/[id]/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useRouter, useParams } from 'next/navigation';
// import Image from 'next/image';
// import { api } from '@/lib/api';
// import { Product } from '@/types';
// import { Spinner } from '@/components/ui/Spinner';
// import { ErrorMessage } from '@/components/ui/ErrorMessage';
// import { Layout } from '@/components/layout/Layout';
// import { Star, ArrowLeft, ChevronLeft, ChevronRight, Info, Shield, Truck, Package, RotateCw, Tag } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function ProductDetailsPage() {
//   const router = useRouter();
//   const { id } = useParams<{ id: string }>();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const { data: product, isLoading, error } = useQuery<Product, Error>({
//     queryKey: ['product', id],
//     queryFn: () => api.getProduct(id),
//     enabled: !!id,
//     retry: 2,
//   });

//   if (isLoading) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center h-screen">
//           <Spinner size="lg" />
//         </div>
//       </Layout>
//     );
//   }

//   if (error || !product) {
//     return (
//       <Layout>
//         <ErrorMessage
//           message={error?.message || 'Product not found'}
//           onRetry={() => router.refresh()}
//         />
//       </Layout>
//     );
//   }

//   const images = [product.thumbnail, ...(product.images || [])].filter(Boolean);
//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };
//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Calculate discounted price
//   const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));

//   return (
//     <Layout>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-15"
//       >
//         <motion.button
//           onClick={() => router.back()}
//           whileHover={{ x: -4 }}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors"
//           aria-label="Back to products"
//         >
//           <ArrowLeft size={20} />
          
//         </motion.button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Image Gallery */}
//           <div className="relative w-full aspect-square rounded-xl bg-gray-50 dark:bg-gray-800 overflow-hidden">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentImageIndex}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute inset-0"
//               >
//                 <Image
//                   src={images[currentImageIndex]}
//                   alt={`${product.title} - Image ${currentImageIndex + 1}`}
//                   fill
//                   className="object-contain p-4"
//                   priority
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//               </motion.div>
//             </AnimatePresence>
            
//             {images.length > 1 && (
//               <>
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-2">
//                   <motion.button
//                     onClick={prevImage}
//                     whileTap={{ scale: 0.9 }}
//                     className="bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white focus:outline-none backdrop-blur-sm"
//                     aria-label="Previous image"
//                   >
//                     <ChevronLeft size={24} />
//                   </motion.button>
//                 </div>
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-2">
//                   <motion.button
//                     onClick={nextImage}
//                     whileTap={{ scale: 0.9 }}
//                     className="bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white focus:outline-none backdrop-blur-sm"
//                     aria-label="Next image"
//                   >
//                     <ChevronRight size={24} />
//                   </motion.button>
//                 </div>
//                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//                   {images.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       whileHover={{ scale: 1.2 }}
//                       className={`h-2 w-2 rounded-full transition-colors ${
//                         index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
//                       }`}
//                       aria-label={`Go to image ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Product Details */}
//           <div className="flex flex-col gap-6">
//             <div>
//               <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
//                 {product.brand}
//               </span>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-1">
//                 {product.title}
//               </h1>
//               <div className="flex items-center gap-4 mt-3">
//                 <div 
//                   className="flex items-center gap-1.5" 
//                   aria-label={`Rating: ${product.rating.toFixed(1)} out of 5`}
//                 >
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-5 w-5 ${
//                         i < Math.round(product.rating)
//                           ? 'text-yellow-400 fill-current'
//                           : 'text-gray-300 dark:text-gray-600'
//                       }`}
//                       aria-hidden="true"
//                     />
//                   ))}
//                   <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
//                     {product.rating.toFixed(1)}
//                   </span>
//                 </div>
//                 <span className={`text-xs font-medium px-2 py-1 rounded-full ${
//                   product.availabilityStatus === 'In Stock' 
//                     ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
//                     : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
//                 }`}>
//                   {product.availabilityStatus}
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col gap-4">
//               <div className="flex items-center gap-4">
//                 <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
//                   ${discountedPrice.toFixed(2)}
//                 </p>
//                 {product.discountPercentage > 0 && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg text-gray-500 line-through dark:text-gray-400">
//                       ${product.price.toFixed(2)}
//                     </span>
//                     <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">
//                       {product.discountPercentage}% OFF
//                     </span>
//                   </div>
//                 )}
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
//                 {product.description}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex items-start gap-3">
//                 <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
//                   <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900 dark:text-white">Brand:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">{product.brand || 'N/A'}</span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
//                   <Tag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900 dark:text-white">Category:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">{product.category || 'N/A'}</span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
//                   <Package className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900 dark:text-white">Stock:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
//                   <Shield className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900 dark:text-white">Warranty:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {product.warrantyInformation || 'No warranty'}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
//                   <Truck className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900 dark:text-white">Shipping:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {product.shippingInformation || 'Shipping information not available'}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
//                   <RotateCw className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900 dark:text-white">Returns:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {product.returnPolicy || 'No return policy'}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {product.tags && product.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2">
//                 {product.tags.map((tag) => (
//                   <motion.span 
//                     key={tag}
//                     whileHover={{ y: -2 }}
//                     className="text-xs font-medium bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full dark:bg-gray-800 dark:text-gray-200"
//                   >
//                     {tag}
//                   </motion.span>
//                 ))}
//               </div>
//             )}

//             <div className="border-t border-gray-200 dark:border-gray-700 py-6">
//               <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Specifications</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <span className="font-medium text-gray-900 dark:text-white">Weight:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {product.weight ? `${product.weight} ` : 'N/A'}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-medium text-gray-900 dark:text-white">Dimensions:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {product.dimensions 
//                       ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} in` 
//                       : 'N/A'}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-medium text-gray-900 dark:text-white">Minimum Order:</span>{' '}
//                   <span className="text-gray-600 dark:text-gray-300">
//                     {product.minimumOrderQuantity || '1'}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {product.reviews && product.reviews.length > 0 && (
//               <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//                 <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">Customer Reviews</h3>
//                 <div className="space-y-6">
//                   {product.reviews.map((review, index) => {
//                     const reviewDate = new Date(review.date);
//                     const formattedDate = reviewDate.toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'short',
//                       day: 'numeric'
//                     });
                    
//                     return (
//                       <motion.div 
//                         key={index} 
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0"
//                       >
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <p className="font-medium text-gray-900 dark:text-white">{review.reviewerName}</p>
//                             <div className="flex items-center gap-1 mt-1">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className={`h-4 w-4 ${
//                                     i < review.rating
//                                       ? 'text-yellow-400 fill-current'
//                                       : 'text-gray-300 dark:text-gray-600'
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                           <span className="text-sm text-gray-500 dark:text-gray-400">
//                             {formattedDate}
//                           </span>
//                         </div>
//                         <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
//                           {review.comment}
//                         </p>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </Layout>
//   );
// }


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
import { Star, ArrowLeft, ChevronLeft, ChevronRight, Info, Shield, Truck, Package, RotateCw, Tag, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// New Modal Component for QR Code
const QRCodeModal = ({ isOpen, onClose, qrCodeUrl }: { isOpen: boolean; onClose: () => void; qrCodeUrl: string }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scan QR Code</h3>
        <Image
          src={qrCodeUrl}
          alt="Product QR Code"
          width={200}
          height={200}
          className="mx-auto rounded-lg"
        />
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

// New Share Dropdown Component
const ShareDropdown = ({ isOpen, onClose, productUrl }: { isOpen: boolean; onClose: () => void; productUrl: string }) => {
  if (!isOpen) return null;

  const shareLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.878-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=Check%20out%20this%20amazing%20product!`,
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.148-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-.719-.911-.99-.242-.272-.473-.147-.669-.099-.198.05-1.686.408-1.983.606-.297.198-1.582.896-1.582 2.182 0 1.286.992 2.522 1.13 2.695.138.174 1.937 2.963 4.697 4.156.744.332 1.325.505 1.776.673.446.168.892.149 1.224.099.347-.05 1.08-.446 1.232-.842.149-.396.149-.693.099-.842-.05-.149-.223-.347-.52-.495zm-5.468 8.27c-2.147 0-4.266-.576-6.114-1.663l-.446-.297-4.52.669.669-4.406-.297-.446c-1.087-1.848-1.663-3.967-1.663-6.114 0-6.395 5.198-11.593 11.593-11.593 3.1 0 6.01 1.208 8.198 3.396s3.396 5.098 3.396 8.198c0 6.395-5.198 11.593-11.593 11.593zm9.594-1.98c-1.692 1.087-3.918 1.732-6.297 1.732-7.345 0-13.292-5.947-13.292-13.292 0-3.517 1.365-6.822 3.842-9.299 2.477-2.477 5.782-3.842 9.299-3.842 7.345 0 13.292 5.947 13.292 13.292 0 2.379-.645 4.605-1.732 6.297l.088.099z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=Check%20out%20this%20product:%20${encodeURIComponent(productUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.024-3.037-1.852-3.037-1.852 0-2.136 1.447-2.136 2.941v5.665H9.352V9.001h3.414v1.561h.048c.477-.9 1.637-1.852 3.367-1.852 3.605 0 4.27 2.373 4.27 5.459v6.283zM5.337 7.433c-1.144 0-2.063-.93-2.063-2.077 0-1.147.919-2.078 2.063-2.078 1.144 0 2.063.931 2.063 2.078 0 1.147-.919 2.077-2.063 2.077zm1.777 13.019H3.558V9.001h3.556v11.451zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.454C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex gap-4 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

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

  // Construct product URL for sharing
  const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/product/${id}`;

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
          Back
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

            {/* Share and QR Code Buttons */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <motion.button
                onClick={() => setIsShareOpen(!isShareOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white focus:outline-none backdrop-blur-sm"
                aria-label="Share product"
              >
                <Share2 size={24} />
              </motion.button>
              <motion.button
                onClick={() => setIsQRCodeOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white focus:outline-none backdrop-blur-sm"
                aria-label="View QR code"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m-3 0h-2m-2 0H9m3 3h-2m-2 0H9m3 3h-2m-2 0H9m3-9v3m3 0h2m2 0h-2m-3 0h2m2 0h-2m-3 3v3m3 0h-2m-3 0h2m2 0h-2m-3 3v3m3 0h-2m-3 0h2m2 0h-2"
                  />
                </svg>
              </motion.button>
            </div>
            <ShareDropdown isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} productUrl={productUrl} />
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
                    {product.weight ? `${product.weight} oz` : 'N/A'}
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

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRCodeOpen}
        onClose={() => setIsQRCodeOpen(false)}
        qrCodeUrl={product.qrCode || 'https://cdn.dummyjson.com/public/qr-code.png'}
      />
    </Layout>
  );
}