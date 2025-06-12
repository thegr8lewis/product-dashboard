Great! Here's a clean and professional `ARCHITECTURE.md` you can include in your project root to document your architectural decisions:

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

Let me know if you want this saved to a file or linked in your README automatically.
