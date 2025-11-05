import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const SortDropdown = () => {
  const { filters, updateFilters } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'popularity', label: 'Most Popular' },
  ];

  const defaultSort = { value: 'default', label: '' };
  const currentSort = sortOptions.find(option => option.value === filters.sortBy) || defaultSort;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortChange = (value) => {
    updateFilters({ sortBy: value });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-200"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'saturate(180%) blur(30px)',
          WebkitBackdropFilter: 'saturate(180%) blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <ArrowsUpDownIcon className="h-5 w-5 text-white" />
        <span className="font-medium text-white" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Sort: {currentSort.label}</span>
        <ChevronDownIcon 
          className={`h-4 w-4 text-white/70 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden z-20"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'saturate(180%) blur(40px)',
              WebkitBackdropFilter: 'saturate(180%) blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
            }}
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between ${
                  filters.sortBy === option.value ? 'bg-white/20 text-white' : 'text-white'
                }`}
                style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
              >
                <span className="font-medium">{option.label}</span>
                {filters.sortBy === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
