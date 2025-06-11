// src/lib/api.ts

import { Product, ProductsResponse, } from '@/types';

const BASE_URL = 'https://dummyjson.com';

export const api = {

    async getProducts(): Promise<ProductsResponse> {
    const url = `${BASE_URL}/products`;
    console.log('Fetching products from:', url);
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Products API error:', response.status, response.statusText);
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
  },

  async getProduct(id: string): Promise<Product> {
    const url = `${BASE_URL}/products/${id}`;
    console.log('Fetching product from:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Product API error:', response.status, response.statusText, await response.text());
        throw new Error(`Failed to fetch product details: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Product data received:', data);
      return data;
    } catch (error) {
      console.error('Fetch error for product:', error);
      throw error;
    }
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category ${category}`);
    }
    return response.json();
  },

  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Failed to search products for "${query}"`);
    }
    return response.json();
  },
  

};