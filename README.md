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
│   │   ├── product/[id]/         # Dynamic product detail pages
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css           # Global styles (Tailwind CSS)
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   └── providers.tsx         # Context providers (React Query, etc.)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── products/
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── SearchBar.tsx
│   │   └── ui/
│   │       ├── ErrorBoundary.tsx
│   │       ├── ErrorMessage.tsx
│   │       └── Spinner.tsx
│   ├── hooks/
│   │   └── useProducts.ts
│   ├── lib/
│   │   └── splits/
│   ├── styles/
│   │   └── tailwind.config.js
│   └── types/
│       └── index.ts
├── public/
├── .gitignore
├── .eslintrc.json
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
└── tsconfig.json
```

---

## 🛠️ Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   Visit `http://localhost:3000`

---

## 🤝 Contributing

We welcome contributions!

```bash
# Fork the repo and create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m 'Add some amazing feature'

# Push to your fork
git push origin feature/amazing-feature

# Open a pull request
```

---

## 🚀 Future Enhancements

* [ ] Product comparison feature
* [ ] Shopping cart functionality
* [ ] User authentication
* [ ] Product reviews and rating system
* [ ] Advanced filters (e.g., price range, rating)
* [ ] Pagination for large datasets
* [ ] Wishlist functionality

---

## 📄 License

MIT License. Feel free to use and modify this project.

---

Let me know if you'd like this exported as a `.md` file.


## Key Components

### ProductCard
Displays individual product information including:
- Product image with fallback
- Title and description
- Price and rating
- Category badge
- Click-to-navigate functionality

### SearchBar
Real-time search functionality:
- Debounced input for performance
- Search by product title
- Clear search option

### CategoryFilter
Dropdown filter component:
- Dynamic category list from API data
- Filter products by selected category
- Reset filter option

### ProductGrid
Container component managing:
- Responsive grid layout
- Loading states with skeleton UI
- Empty states
- Error boundaries

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

## API Integration

**Base URL**: `https://dummyjson.com/products`

**Endpoints Used**:
- `GET /products` - Fetch all products with pagination
- `GET /products/:id` - Fetch individual product details
- `GET /products/categories` - Fetch available categories

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Notes

- Components follow React best practices with proper prop typing
- Custom hooks abstract API logic from UI components  
- Error boundaries prevent application crashes
- Consistent naming conventions throughout the codebase
- Responsive design tested across multiple device sizes


