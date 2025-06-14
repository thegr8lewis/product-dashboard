// // tailwind.config.ts
// import type { Config } from 'tailwindcss'
// import forms from '@tailwindcss/forms'
// import typography from '@tailwindcss/typography'

// export default {
//   darkMode: 'class',
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#f0f9ff',
//           100: '#e0f2fe',
//           500: '#3b82f6', // blue-500
//           600: '#2563eb', // blue-600
//           700: '#1d4ed8', // blue-700
//         },
//         surface: {
//           100: '#f8fafc', // light bg
//           800: '#1e293b', // dark bg
//         },
//         accent: {
//           500: '#ec4899', // pink-500 for accents
//         },
//       },
//       animation: {
//         'fade-in': 'fadeIn 0.3s ease-in-out',
//         'slide-up': 'slideUp 0.3s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(10px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//       },
//     },
//   },
//   plugins: [
//     forms,
//     typography,
//   ],
// } satisfies Config


// const forms = require('@tailwindcss/forms');
// const typography = require('@tailwindcss/typography');

// module.exports = {
//   darkMode: 'class',
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#f0f9ff',
//           100: '#e0f2fe',
//           500: '#3b82f6',
//           600: '#2563eb',
//           700: '#1d4ed8',
//         },
//         surface: {
//           100: '#f8fafc',
//           800: '#1e293b',
//         },
//         accent: {
//           500: '#ec4899',
//         },
//       },
//       animation: {
//         'fade-in': 'fadeIn 0.3s ease-in-out',
//         'slide-up': 'slideUp 0.3s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: '0' },
//           '100%': { opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(10px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//       },
//     },
//   },
//   plugins: [forms, typography],
// };

const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          // Add dark mode variants
          '50-dark': '#f0f9ff',
          '100-dark': '#e0f2fe',
          '500-dark': '#93c5fd',
          '600-dark': '#60a5fa',
          '700-dark': '#3b82f6',
        },
        surface: {
          100: '#f8fafc',
          800: '#1e293b',
          // Add dark mode variants
          '100-dark': '#1e293b',
          '800-dark': '#0f172a',
        },
        accent: {
          500: '#ec4899',
          // Add dark mode variant
          '500-dark': '#f472b6',
        },
      },
      // Add dark mode variants for all utilities
      backgroundColor: ({ theme }) => ({
        ...theme('colors'),
        'dark': '#0f172a', // bg-dark
      }),
      textColor: ({ theme }) => ({
        ...theme('colors'),
        'dark': '#f8fafc', // text-dark
      }),
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        'dark': '#1e293b', // border-dark
      }),
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [forms, typography],
};