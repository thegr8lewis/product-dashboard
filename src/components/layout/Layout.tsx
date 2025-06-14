import { ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { motion } from 'framer-motion';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
  
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        <ErrorBoundary fallbackMessage="An unexpected error occurred in the application">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
export { Layout }
export default Layout