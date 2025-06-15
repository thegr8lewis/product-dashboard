'use client';

import { motion } from 'framer-motion';

export const ShareDropdown = ({ 
  isOpen, 
  productUrl 
}: { 
  isOpen: boolean; 
  productUrl: string 
}) => {
  if (!isOpen) return null;

  const shareLinks = [
    {
      name: 'Twitter',
      color: 'hover:text-blue-400',
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.878-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=Check%20out%20this%20amazing%20product!`,
    },
    // ... other share links (same as original)
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-3 flex gap-3 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className={`text-gray-600 dark:text-gray-300 ${link.color} transition-colors p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800`}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};