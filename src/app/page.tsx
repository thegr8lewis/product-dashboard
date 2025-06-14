
// src/app/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductGrid } from '@/components/products/ProductGrid';
import { SearchBar } from '@/components/products/SearchBar';
import { CategoryFilter } from '@/components/products/CategoryFilter';
import { useProducts } from '@/hooks/useProducts';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { Search, Filter } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  // Fetch products
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts();

  // Extract unique categories
  const categories = useMemo(() => {
    if (!productsData?.products) return [];
    return [...new Set(productsData.products.map((p) => p.category))].map((category) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
    }));
  }, [productsData?.products]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    if (!productsData?.products) return [];

    let filtered = productsData.products;

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

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
  }, [productsData?.products, searchQuery, selectedCategory]);

  // Handle filtering animation separately
  useEffect(() => {
    if (searchQuery || selectedCategory) {
      setIsFiltering(true);
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsFiltering(false);
    }
  }, [searchQuery, selectedCategory]);

  // Debug logging
  useEffect(() => {
    console.log('isSearchOpen changed:', isSearchOpen);
  }, [isSearchOpen]);

  const handleSearch = (query: string) => {
    console.log('handleSearch called with:', query);
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsFilterOpen(false);
  };

  const toggleSearch = () => {
    console.log('Search toggle clicked, current state:', isSearchOpen);
    const newSearchState = !isSearchOpen;
    setIsSearchOpen(newSearchState);
    
    // Clear search query when closing search on mobile
    if (!newSearchState) {
      setSearchQuery('');
    }
    
    if (isFilterOpen) setIsFilterOpen(false); // Close filter if open
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
    if (isSearchOpen) setIsSearchOpen(false); // Close search if open
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
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 pt-20">
              Discover Amazing Products
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
            <div className="w-full sm:w-48">
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
        <div className="space-y-4 pt-10">
          {/* Mobile View (hidden on md and above) */}
          <div className="flex w-full md:hidden gap-4">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-muted rounded hover:bg-muted/80 transition-colors"
              onClick={toggleSearch}
              aria-label="Toggle search bar"
              type="button"
            >
              <Search size={20} />
              <span>Search</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-muted rounded hover:bg-muted/80 transition-colors"
              onClick={toggleFilter}
              aria-label="Toggle category filter"
              type="button"
            >
              <Filter size={20} />
              <span>Category</span>
            </button>
          </div>

          {/* Search Bar for Mobile - appears below buttons */}
          {isSearchOpen && (
            <div className="w-full md:hidden">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by product name..."
                value={searchQuery}
                onClear={handleClearSearch}
              />
            </div>
          )}

          {/* Category Filter Dropdown for Mobile - appears below buttons */}
          {isFilterOpen && (
            <div className="w-full md:hidden">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                isLoading={productsLoading}
              />
            </div>
          )}

          {/* Desktop View (hidden on mobile) */}
          <div className="hidden md:flex gap-4 items-center">
            <div className="flex-1">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by product name..."
                value={searchQuery}
                onClear={handleClearSearch}
              />
            </div>
            <div className="w-48">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                isLoading={productsLoading}
              />
            </div>
          </div>
        </div>

        {/* Products Grid with Skeleton during Filtering */}
        {isFiltering ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-muted rounded-lg animate-pulse">
                <div className="h-48 w-full bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </Layout>
  );
}