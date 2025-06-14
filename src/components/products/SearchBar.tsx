// // // src/components/products/SearchBar.tsx

// // import { Search, X } from 'lucide-react';
// // import { useState, useEffect } from 'react';

// // interface SearchBarProps {
// //   onSearch: (query: string) => void;
// //   placeholder?: string;
// //   className?: string;
// //   value?: string; // Add external value prop
// //   onClear?: () => void; // Add external clear handler
// // }

// // export function SearchBar({ 
// //   onSearch, 
// //   placeholder = "Search products...", 
// //   className = "",
// //   value,
// //   onClear
// // }: SearchBarProps) {
// //   const [query, setQuery] = useState(value || '');
// //   const [debouncedQuery, setDebouncedQuery] = useState(value || '');

// //   // Sync internal state with external value prop
// //   useEffect(() => {
// //     if (value !== undefined) {
// //       setQuery(value);
// //       setDebouncedQuery(value);
// //     }
// //   }, [value]);

// //   // Debounce search query
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       if (debouncedQuery !== query) {
// //         setDebouncedQuery(query);
// //         onSearch(query);
// //       }
// //     }, 300);

// //     return () => clearTimeout(timer);
// //   }, [query, onSearch]);

// //   const handleClear = () => {
// //     setQuery('');
// //     setDebouncedQuery('');
// //     if (onClear) {
// //       onClear();
// //     }
// //   };

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setQuery(e.target.value);
// //   };

// //   return (
// //     <div className={`relative ${className}`}>
// //       <div className="relative">
// //         <Search 
// //           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
// //           size={20} 
// //         />
// //         <input
// //           type="text"
// //           value={query}
// //           onChange={handleInputChange}
// //           placeholder={placeholder}
// //           className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
// //                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
// //                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
// //                      placeholder-gray-500 dark:placeholder-gray-400
// //                      transition-all duration-200"
// //         />
// //         {query && (
// //           <button
// //             onClick={handleClear}
// //             className="absolute right-3 top-1/2 transform -translate-y-1/2 
// //                        text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 
// //                        transition-colors"
// //           >
// //             <X size={20} />
// //           </button>
// //         )}
// //       </div>
      
// //       {/* Search indicator */}
// //       {query && query !== debouncedQuery && (
// //         <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
// //           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// // src/components/products/SearchBar.tsx

// import { Search, X } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';

// interface SearchBarProps {
//   onSearch: (query: string) => void;
//   placeholder?: string;
//   className?: string;
//   value?: string; // Add external value prop
//   onClear?: () => void; // Add external clear handler
// }

// export function SearchBar({ 
//   onSearch, 
//   placeholder = "Search products...", 
//   className = "",
//   value,
//   onClear
// }: SearchBarProps) {
//   const [query, setQuery] = useState(value || '');
//   const [debouncedQuery, setDebouncedQuery] = useState(value || '');
//   const onSearchRef = useRef(onSearch);

//   // Update the ref when onSearch changes
//   useEffect(() => {
//     onSearchRef.current = onSearch;
//   }, [onSearch]);

//   // Sync internal state with external value prop
//   useEffect(() => {
//     if (value !== undefined) {
//       setQuery(value);
//       setDebouncedQuery(value);
//     }
//   }, [value]);

//   // Debounce search query
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

//   // Trigger search when debounced query changes
//   useEffect(() => {
//     onSearchRef.current(debouncedQuery);
//   }, [debouncedQuery]);

//   const handleClear = () => {
//     setQuery('');
//     setDebouncedQuery('');
//     if (onClear) {
//       onClear();
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   return (
//     <div className={`relative ${className}`}>
//       <div className="relative">
//         <Search 
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
//           size={20} 
//         />
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder={placeholder}
//           className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
//                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
//                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
//                      placeholder-gray-500 dark:placeholder-gray-400
//                      transition-all duration-200"
//         />
//         {query && (
//           <button
//             onClick={handleClear}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 
//                        text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 
//                        transition-colors"
//           >
//             <X size={20} />
//           </button>
//         )}
//       </div>
      
//       {/* Search indicator */}
//       {query && query !== debouncedQuery && (
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/components/products/SearchBar.tsx

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  value?: string;
  onClear?: () => void;
}

export function SearchBar({ 
  onSearch, 
  placeholder = "Search products...", 
  className = "",
  value,
  onClear
}: SearchBarProps) {
  const [query, setQuery] = useState(value || '');
  const [debouncedQuery, setDebouncedQuery] = useState(value || '');
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (value !== undefined) {
      setQuery(value);
      setDebouncedQuery(value);
    }
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    onSearchRef.current(debouncedQuery);
  }, [debouncedQuery]);

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    if (onClear) {
      onClear();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
          <Search 
            className="text-gray-400 dark:text-gray-500" 
            size={20} 
          />
          {/* Loading indicator */}
          {query && query !== debouncedQuery && (
            <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full pl-[52px] pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     placeholder-gray-500 dark:placeholder-gray-400
                     transition-all duration-200"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}