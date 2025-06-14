// 'use client';

// import { Moon, Sun, ShoppingBag } from 'lucide-react';
// import { useDarkMode } from '@/hooks/useDarkMode';

// export function Header() {
//   const { isDark, toggle, mounted } = useDarkMode();

//   if (!mounted) return null;

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center gap-2">
//             <ShoppingBag className="h-8 w-8 text-blue-600" aria-hidden="true" />
//             <h1 className="text-xl font-bold text-gray-900 dark:text-white">
//               Product Dashboard
//             </h1>
//           </div>
//           <button
//             onClick={toggle}
//             className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 
//               hover:bg-gray-200 dark:hover:bg-gray-600 
//               transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
//             aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
//           >
//             {isDark ? (
//               <Sun className="h-5 w-5 text-yellow-500" />
//             ) : (
//               <Moon className="h-5 w-5 text-gray-600" />
//             )}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }



// components/layout/Header.tsx
'use client';

import { Moon, Sun, ShoppingBag } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { isDark, toggle, mounted } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-primary-600" aria-hidden="true" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Product Dashboard
            </h1>
          </div>
          {/* <button
            onClick={toggle}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700
               hover:bg-gray-200 dark:hover:bg-gray-600
               transition-all duration-200 ease-in-out
               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
               transform hover:scale-105 active:scale-95"
            aria-label={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
            suppressHydrationWarning
          >
            {mounted ? (
              isDark ? (
                <Sun className="h-5 w-5 text-yellow-500 transition-transform duration-200 rotate-0 hover:rotate-12" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300 transition-transform duration-200 rotate-0 hover:-rotate-12" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </button> */}
        </div>
      </div>
    </header>
  );
}