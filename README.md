# 🛍️ Product Dashboard

A modern product dashboard built with **Next.js (App Router)** that displays products from the [DummyJSON API](https://dummyjson.com/products). Features include real-time search, category filtering, responsive grid layout, and error handling.

---

## 📦 Features

* Fetch and display products from an external API
* Real-time search with debounce
* Filter products by category
* Responsive product grid with skeleton loaders
* Detailed product pages
* Error boundary handling
* Modular component structure

---

## 🔌 API Integration

**Base URL:** `https://dummyjson.com/products`

### Endpoints Used

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/products`            | Fetch all products with pagination |
| GET    | `/products/:id`        | Fetch individual product details   |
| GET    | `/products/categories` | Fetch available product categories |

---

## 🧱 Component Overview

### 🧩 `ProductCard`

* Displays product image (with fallback)
* Shows title, description, price, and rating
* Category badge
* Click-to-navigate to detail page

### 🔍 `SearchBar`

* Real-time product title search
* Debounced input for performance
* Clear search button

### 🗂️ `CategoryFilter`

* Dropdown populated with API categories
* Filters product grid by category
* Reset option to remove filter

### 🧮 `ProductGrid`

* Responsive grid layout
* Handles loading and empty states
* Wrapped in error boundary

---

## 📁 Project Structure

```
product-dashboard/
├── src/
│   ├── app/
│   │   ├── product/[id]/               # Dynamic product detail pages
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css                 # Global styles (Tailwind CSS)
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Home page
│   │   └── providers.tsx               # Context providers (React Query, etc.)
│   ├── components/                     # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Footer.tsx              # Application footer
│   │   │   ├── Header.tsx              # Navigation header
│   │   │   └── Layout.tsx              # Main layout wrapper
│   │   ├── products/                   
│   │   │   ├── CategoryFilter.tsx      # Category filtering dropdown
│   │   │   ├── ProductCard.tsx         # Individual product card
│   │   │   ├── ProductGrid.tsx         # Products grid container
│   │   │   └── SearchBar.tsx           # Search input component
│   │   └── ui/
│   │       ├── ErrorBoundary.tsx        # Error boundary wrapper
│   │       ├── ErrorMessage.tsx         # Error display component
│   │       └── Spinner.tsx              # Loading spinner
│   ├── hooks/
│   │   └── useProducts.ts               # Custom hook for product data fetching
│   ├── lib/
│   │   └── api.ts/                      # Utility functions and configurations
│   ├── styles/
│   │   └── tailwind.config.js           # Tailwind CSS configuration  
│   └── types/
│       └── index.ts                     # TypeScript type definitions
├── public/                              # Static assets
├── .gitignore
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
└── tsconfig.json
```

---



## Data Flow

1. **Initial Load**: App fetches all products using React Query
2. **Caching**: Data is cached and shared across components
3. **Search/Filter**: Client-side operations on cached data
4. **Navigation**: Product details fetched on-demand with caching
5. **Error Handling**: Graceful fallbacks and retry mechanisms

## UI/UX Features

- **Loading States**: Skeleton loaders maintain layout during data fetching
- **Error Boundaries**: Graceful error handling with retry options
- **Responsive Design**: Seamless experience across all device sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized images and lazy loading

## Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js`:
- Extended color palette
- Custom breakpoints
- Animation utilities

### Next.js
Configuration in `next.config.js`:
- Image optimization settings
- Build optimizations
- Environment-specific settings

## Performance Optimizations

- **React Query Caching**: Intelligent data caching and background updates
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with App Router
- **Debounced Search**: Prevents excessive API calls during typing
- **Lazy Loading**: Images and components loaded on demand

## Development Notes

- Components follow React best practices with proper prop typing
- Custom hooks abstract API logic from UI components  
- Error boundaries prevent application crashes
- Consistent naming conventions throughout the codebase
- Responsive design tested across multiple device sizes


## 🛠️ Setup

Follow these steps to get the project up and running locally:

### 1. **Clone the Repository**

```bash
https://github.com/thegr8lewis/product-dashboard.git
cd product-dashboard
```
---

### 2. **Install Dependencies**

Make sure you have **Node.js** (v18 or higher) and **npm** installed. Then run:

```bash
npm install
```

---

### 3. **Run the Development Server**

```bash
npm run dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000)

---

### 4. **Build for Production**

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run start
```

---

---

# 🧠 Architecture Overview

This document outlines key architectural decisions made in the **Product Dashboard** project and the rationale behind them. It helps current and future contributors understand the structure, design patterns, and choices guiding the codebase.

---

## 🗂️ Project Structure (High-Level)

```
src/
├── app/              # Next.js App Router structure
├── components/       # Reusable UI components grouped by feature
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and configurations
├── styles/           # Tailwind CSS configuration
├── types/            # TypeScript type definitions
```

---

## 🏗️ Architectural Decisions

### ✅ **Next.js App Router (`/app` directory)**

* Leverages the latest routing paradigm in Next.js.
* Supports server components, route-based layouts, and co-located files.
* Improves maintainability with file-based routing.

### ✅ **React Query for Data Fetching**

* Chosen for its robust data caching, background refetching, and status management.
* Keeps API logic out of components using `useProducts` custom hook.
* Seamlessly handles loading and error states.

### ✅ **Component-Driven Design**

* UI is split into small, composable components (`ProductCard`, `SearchBar`, `ProductGrid`, etc.).
* Components are grouped by domain (`products/`, `layout/`, `ui/`) for better organization.
* Encourages reusability and separation of concerns.

### ✅ **Tailwind CSS**

* Utility-first CSS framework allows for fast styling and consistent design.
* Eliminates the need for writing large custom stylesheets.
* Configurable through `tailwind.config.js`.

### ✅ **Loading & Error UX**

* `Spinner.tsx` and skeleton loaders improve perceived performance during API fetches.
* `ErrorBoundary.tsx` prevents app crashes by catching component-level rendering errors.
* Fallback UIs are used in all asynchronous rendering paths.

### ✅ **TypeScript Across the Codebase**

* Provides static typing, improving developer confidence and reducing runtime errors.
* Custom types for product data ensure API response consistency.

---

## 🔍 Notable Patterns

| Pattern                      | Purpose                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| Custom Hooks (`useProducts`) | Encapsulates API logic, improves testability and reusability |
| Feature-Based Foldering      | Keeps related UI and logic grouped together                  |
| Fallback & Graceful UI       | Skeletons, empty states, and error boundaries everywhere     |

---

## ⚙️ Extensibility

The architecture supports the following future enhancements with minimal refactoring:

* Adding pagination or infinite scroll
* Integrating authentication (e.g., with NextAuth)
* Adding a shopping cart or wishlist using React Context or Zustand
* Introducing SSR/SSG support via `getServerSideProps` if needed

---

