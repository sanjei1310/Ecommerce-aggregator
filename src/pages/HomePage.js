import React, { useState } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/common/FilterSidebar';
import SortDropdown from '../components/common/SortDropdown';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="flex gap-6">
      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <FilterSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Filter and Sort Bar */}
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <FunnelIcon className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Filters</span>
          </button>
          <SortDropdown />
        </div>

        {/* Desktop Sort Bar */}
        <div className="hidden lg:flex justify-end mb-6">
          <SortDropdown />
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
            />

            {/* Filter Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-40 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
