'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const QRCodeModal = ({ 
  isOpen, 
  onClose, 
  qrCodeUrl 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  qrCodeUrl: string 
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product QR Code</h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 mb-4">
            <Image
              src={qrCodeUrl}
              alt="Product QR Code"
              width={200}
              height={200}
              className="mx-auto rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Scan to view this product on your mobile device
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};