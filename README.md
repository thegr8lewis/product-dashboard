# Modern Product Dashboard

A responsive, modern product dashboard built with Next.js 13+ App Router, TypeScript, and Tailwind CSS. This application provides a clean interface for exploring and searching products using the DummyJSON API.

![Product Dashboard](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Product+Dashboard)

## Features

- **Product Listing**: Responsive grid layout displaying product cards with images, titles, prices, and ratings
- **Search & Filter**: Real-time search by product title and category filtering
- **Product Details**: Detailed product view with comprehensive information
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Meaningful error messages and fallback states
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Dark Mode**: Toggle between light and dark themes
- **Performance Optimized**: React Query for efficient data fetching and caching

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: React Query (TanStack Query)
- **Icons**: Lucide React
- **API**: DummyJSON Products API

## Project Structure
product-dashboard/
├── src/
│ ├── app/ # Next.js App Router
│ │ ├── product/[id]/ # Dynamic product detail pages
│ │ │ └── page.tsx
│ │ ├── favicon.ico
│ │ ├── globals.css # Global styles & Tailwind imports
│ │ ├── layout.tsx # Root layout component
│ │ ├── page.tsx # Home page
│ │ └── providers.tsx # App providers (React Query, etc.)
│ ├── components/ # Reusable UI components
│ │ ├── layout/
│ │ │ ├── Footer.tsx # Application footer
│ │ │ ├── Header.tsx # Navigation header
│ │ │ └── Layout.tsx # Main layout wrapper
│ │ ├── products/
│ │ │ ├── CategoryFilter.tsx # Category filtering dropdown
│ │ │ ├── ProductCard.tsx # Individual product card
│ │ │ ├── ProductGrid.tsx # Products grid container
│ │ │ └── SearchBar.tsx # Search input component
│ │ └── ui/
│ │ ├── ErrorBoundary.tsx # Error boundary wrapper
│ │ ├── ErrorMessage.tsx # Error display component
│ │ └── Spinner.tsx # Loading spinner
│ ├── hooks/
│ │ └── useProducts.ts # Custom hook for product data fetching
│ ├── lib/
│ │ └── splits/ # Utility functions and configurations
│ ├── styles/
│ │ └── tailwind.config.js # Tailwind CSS configuration
│ └── types/
│ └── index.ts # TypeScript type definitions
├── public/ # Static assets
├── .gitignore
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
└── tsconfig.json

API Integration
Base URL: https://dummyjson.com/products

Endpoints Used:

GET /products - Fetch all products with pagination

GET /products/:id - Fetch individual product details

GET /products/categories - Fetch available categories

Key Components
ProductCard
Displays individual product information including:

Product image with fallback

Title and description

Price and rating

Category badge

Click-to-navigate functionality

SearchBar
Real-time search functionality:

Debounced input for performance

Search by product title

Clear search option

CategoryFilter
Dropdown filter component:

Dynamic category list from API data

Filter products by selected category

Reset filter option

ProductGrid
Container component managing:

Responsive grid layout

Loading states with skeleton UI

Empty states

Error boundaries

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Future Enhancements
Add product comparison feature

Implement shopping cart functionality

Add user authentication

Include product reviews and ratings

Add advanced filtering options (price range, ratings)

Implement pagination for large datasets

Add product wishlist feature
