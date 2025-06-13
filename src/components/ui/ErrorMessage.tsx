// src/components/ui/ErrorMessage.tsx
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Modern glass card */}
      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-red-200/30 dark:border-red-800/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-red-500/10">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 via-pink-50/20 to-orange-100/40 dark:from-red-900/20 dark:via-pink-900/10 dark:to-orange-900/20 rounded-3xl"></div>
        
        <div className="relative z-10 text-center">
          {/* Modern icon with glow */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-red-500 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-rose-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-red-500/30">
              <ShieldAlert className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Clean typography */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Something went wrong
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
            {message}
          </p>

          {/* Sleek retry button */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}