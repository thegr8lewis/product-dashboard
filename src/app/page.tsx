// // src/app/page.tsx
// 'use client';

// import { useState, useMemo, useEffect } from 'react';
// import { Layout } from '@/components/layout/Layout';
// import { ProductGrid } from '@/components/products/ProductGrid';
// import { SearchBar } from '@/components/products/SearchBar';
// import { useProducts } from '@/hooks/useProducts';
// import { Spinner } from '@/components/ui/Spinner';
// import { ErrorMessage } from '@/components/ui/ErrorMessage';

// export default function HomePage() {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch products
//   const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts();

//   // Debug: Log fetched products
//   useEffect(() => {
//     if (productsData?.products) {
//       console.log(
//         'Fetched products:',
//         productsData.products.map((p) => ({
//           id: p.id,
//           title: p.title,
//           description: p.description,
//           brand: p.brand,
//           category: p.category,
//         }))
//       );
//     }
//   }, [productsData]);

//   // Filter products based on search query
//   const filteredProducts = useMemo(() => {
//     if (!productsData?.products) return [];

//     let filtered = productsData.products;

//     // Filter by search query
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter((product) => {
//         const title = typeof product.title === 'string' ? product.title.toLowerCase() : '';
//         const description = typeof product.description === 'string' ? product.description.toLowerCase() : '';
//         const brand = typeof product.brand === 'string' ? product.brand.toLowerCase() : '';
//         const category = typeof product.category === 'string' ? product.category.toLowerCase() : '';

//         return (
//           title.includes(query) ||
//           description.includes(query) ||
//           brand.includes(query) ||
//           category.includes(query)
//         );
//       });
//     }

//     return filtered;
//   }, [productsData?.products, searchQuery]);

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   // Handle error state
//   if (productsError) {
//     return (
//       <Layout>
//         <ErrorMessage
//           message={
//             typeof productsError === 'object' && 'message' in productsError
//               ? (productsError as { message: string }).message
//               : 'Failed to load products'
//           }
//           onRetry={() => window.location.reload()}
//         />
//       </Layout>
//     );
//   }

//   // Handle loading state
//   if (productsLoading) {
//     return (
//       <Layout>
//         <div className="space-y-8">
//           {/* Header Section */}
//           <div className="text-center">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//               Discover Amazing Products
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               Browse through our extensive collection of products. Use the search and filters below
//               to find exactly what you're looking for.
//             </p>
//           </div>
//           {/* Placeholder for search */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center">
//             <div className="flex-1 w-full">
//               <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
//             </div>
//           </div>
//           <div className="flex justify-center items-center h-64">
//             <Spinner size="lg" />
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="space-y-8">
//         {/* Header Section */}
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
//             Discover Amazing Products
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Browse through our extensive collection of products. Use the search and filters below
//             to find exactly what you're looking for.
//           </p>
//         </div>

//         {/* Search Section */}
//         <div className="flex flex-col sm:flex-row gap-4 items-center">
//           <div className="flex-1 w-full">
//             <SearchBar
//               onSearch={handleSearch}
//               placeholder="Search by product name, brand, or description..."
//             />
//           </div>
//         </div>

//         {/* Products Grid */}
//         <ProductGrid
//           products={filteredProducts}
//           isLoading={productsLoading}
//           error={
//             typeof productsError === 'object' && productsError && 'message' in productsError
//               ? (productsError as { message: string }).message
//               : undefined
//           }
//           onRetry={() => window.location.reload()}
//         />
//       </div>
//     </Layout>
//   );
// }

// src/app/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SearchBar } from '@/components/products/SearchBar';
import { useProducts } from '@/hooks/useProducts';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts();

  // Debug: Log fetched products
  useEffect(() => {
    if (productsData?.products) {
      console.log(
        'Fetched products:',
        productsData.products.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          brand: p.brand,
          category: p.category,
        }))
      );
    }
  }, [productsData]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!productsData?.products) return [];

    let filtered = productsData.products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) => {
        const title = typeof product.title === 'string' ? product.title.toLowerCase() : '';
        const description = typeof product.description === 'string' ? product.description.toLowerCase() : '';
        const brand = typeof product.brand === 'string' ? product.brand.toLowerCase() : '';
        const category = typeof product.category === 'string' ? product.category.toLowerCase() : '';

        return (
          title.includes(query) ||
          description.includes(query) ||
          brand.includes(query) ||
          category.includes(query)
        );
      });
    }

    return filtered;
  }, [productsData?.products, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle error state
  if (productsError) {
    return (
      <Layout>
        <ErrorMessage
          message={
            typeof productsError === 'object' && 'message' in productsError
              ? (productsError as { message: string }).message
              : 'Failed to load products'
          }
          onRetry={() => window.location.reload()}
        />
      </Layout>
    );
  }

  // Handle loading state
  if (productsLoading) {
    return (
    
      <Layout>
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Discover Amazing Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our extensive collection of products. Use the search and filters below
              to find exactly what you're looking for.
            </p>
          </div>
          {/* Placeholder for search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        </div>
      </Layout>
     
    );
  }

  return (
   
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Discover Amazing Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our extensive collection of products. Use the search and filters below
            to find exactly what you're looking for.
          </p>
        </div>

        {/* Search Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by product name, brand, or description..."
            />
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          isLoading={productsLoading}
          error={
            typeof productsError === 'object' && productsError && 'message' in productsError
              ? (productsError as { message: string }).message
              : undefined
          }
          onRetry={() => window.location.reload()}
        />
      </div>
    </Layout>
  
  );
}