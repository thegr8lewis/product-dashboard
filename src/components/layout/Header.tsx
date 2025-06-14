
// 'use client';

// import { ShoppingBag, User } from 'lucide-react';
// import Link from 'next/link';

// export function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-sm border-b border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo - clickable to go home */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 
//                        transition-colors focus:outline-none"
//             aria-label="Go to home page"
//           >
//             <ShoppingBag className="h-8 w-8 text-blue-600" aria-hidden="true" />
//             <h1 className="text-xl font-bold text-white">
//               Product Dashboard
//             </h1>
//           </Link>

//           {/* User icon */}
//           <button
//             className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 
//                        transition-colors focus:outline-none"
//             aria-label="User profile"
//           >
//             <User className="h-5 w-5 text-gray-300" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }









'use client';

import { Moon, Sun, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkStored = localStorage.getItem('darkMode');
    const isDark = isDarkStored
      ? isDarkStored === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  if (!mounted) {
    // Return a fallback that matches your light mode by default
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <h1 className="text-xl font-bold text-gray-900">Product Dashboard</h1>
            </div>
            <button
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Switch to dark mode"
            >
              <Moon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-blue-600" aria-hidden="true" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Product Dashboard
            </h1>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
                       hover:bg-gray-200 dark:hover:bg-gray-600 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}