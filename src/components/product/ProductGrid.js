import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, FaceFrownIcon } from '@heroicons/react/24/outline';

const ProductGrid = () => {
  const { filteredProducts, loading, searchQuery } = useAppContext();

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (filteredProducts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div 
          className="rounded-full p-6 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          {searchQuery ? (
            <MagnifyingGlassIcon className="h-16 w-16 text-white/70" />
          ) : (
            <FaceFrownIcon className="h-16 w-16 text-white/70" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
          {searchQuery ? 'No products found' : 'No products available'}
        </h3>
        <p className="text-white/70 text-center max-w-md" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
          {searchQuery 
            ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or filters.`
            : 'Please check back later or try adjusting your filters.'}
        </p>
      </motion.div>
    );
  }

  // Product count
  const productCount = filteredProducts.length;

  return (
    <div>
      {/* Results count */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex items-center justify-between"
      >
        <p className="text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
          Showing <span className="font-bold text-white">{productCount}</span> products
          {searchQuery && (
            <span> for "<span className="font-bold text-white">{searchQuery}</span>"</span>
          )}
        </p>
      </motion.div>

      {/* Product Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
