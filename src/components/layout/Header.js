import React, { useState } from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    getCartItemCount, 
    setIsCartOpen 
  } = useAppContext();
  
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const cartItemCount = getCartItemCount();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40" style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'saturate(180%) blur(50px)',
      WebkitBackdropFilter: 'saturate(180%) blur(50px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              ShopAggregator
            </h1>
          </motion.div>

          {/* Search Bar */}
          <motion.form 
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl mx-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={`relative group ${isSearchFocused ? 'scale-105' : ''} transition-transform duration-200`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search products across all platforms..."
                className="block w-full pl-10 pr-10 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 placeholder-white/60"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(30px)',
                  WebkitBackdropFilter: 'blur(30px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    type="button"
                    onClick={clearSearch}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* Cart Icon */}
          <motion.button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCartIcon className="h-6 w-6 text-white transition-colors" />
            <AnimatePresence>
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
