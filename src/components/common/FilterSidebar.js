import React, { useState, useEffect } from 'react';
import { FunnelIcon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '../../context/AppContext';
import { getCategories, getBrands, getPlatforms } from '../../services/mockDataService';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSidebar = () => {
  const { filters, updateFilters, resetFilters } = useAppContext();
  const [categories] = useState(getCategories());
  const [brands] = useState(getBrands());
  const [platforms] = useState(getPlatforms());
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    brand: false,
    rating: true,
    platform: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    updateFilters({
      [type]: parseInt(value)
    });
  };

  const handleCategoryToggle = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const handleBrandToggle = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    updateFilters({ brands: newBrands });
  };

  const handlePlatformToggle = (platform) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    updateFilters({ platforms: newPlatforms });
  };

  const handleRatingFilter = (rating) => {
    updateFilters({ minRating: rating });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.brands.length + 
    filters.platforms.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 250000 ? 1 : 0);

  return (
    <div 
      className="rounded-3xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar"
      style={{
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'saturate(180%) blur(40px)',
        WebkitBackdropFilter: 'saturate(180%) blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-white" />
          <h2 className="text-lg glass-text-heading">Filters</h2>
          {activeFiltersCount > 0 && (
            <span 
              className="text-white text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8))',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(59, 130, 246, 0.4)'
              }}
            >
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-white hover:text-blue-300 font-medium transition-colors"
            style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="glass-text-heading">Price Range</h3>
          {expandedSections.price ? (
            <ChevronUpIcon className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-white/70" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>₹</span>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 glass-input"
                    placeholder="0"
                  />
                  <span className="text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>-</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 glass-input"
                    placeholder="250000"
                  />
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="250000"
                    value={filters.maxPrice}
                    onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                    className="w-full glass-range"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/20 my-4"></div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="glass-text-heading">Categories</h3>
          {expandedSections.category ? (
            <ChevronUpIcon className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-white/70" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="glass-checkbox"
                    />
                    <span className="text-sm glass-text group-hover:text-white transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/20 my-4"></div>

      {/* Brands */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brand')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="glass-text-heading">Brands</h3>
          {expandedSections.brand ? (
            <ChevronUpIcon className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-white/70" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.brand && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 max-h-48 overflow-y-auto glass-scrollbar pr-3 mr-1">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="glass-checkbox"
                    />
                    <span className="text-sm glass-text group-hover:text-white transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/20 my-4"></div>

      {/* Rating */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="glass-text-heading">Customer Rating</h3>
          {expandedSections.rating ? (
            <ChevronUpIcon className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-white/70" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.rating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    onClick={() => handleRatingFilter(rating)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl transition-all ${
                      filters.minRating === rating
                        ? 'glass-input border-2 border-blue-400'
                        : 'hover:bg-white/10 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(rating)].map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <StarIcon key={i + rating} className="h-4 w-4 text-gray-300" />
                      ))}
                    </div>
                    <span className="text-sm glass-text">& above</span>
                  </button>
                ))}
                {filters.minRating > 0 && (
                  <button
                    onClick={() => handleRatingFilter(0)}
                    className="text-sm text-white hover:text-blue-300 font-medium transition-colors"
                    style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
                  >
                    Clear rating filter
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/20 my-4"></div>

      {/* Platforms */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('platform')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="glass-text-heading">Platforms</h3>
          {expandedSections.platform ? (
            <ChevronUpIcon className="h-4 w-4 text-white/70" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-white/70" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.platform && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {platforms.map(platform => (
                  <label key={platform} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.platforms.includes(platform)}
                      onChange={() => handlePlatformToggle(platform)}
                      className="glass-checkbox"
                    />
                    <span className="text-sm glass-text group-hover:text-white transition-colors">
                      {platform}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterSidebar;
