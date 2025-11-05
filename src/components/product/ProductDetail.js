import React, { useState } from 'react';
import { XMarkIcon, StarIcon, ShoppingCartIcon, ArrowTopRightOnSquareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useAppContext } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import PriceComparison from './PriceComparison';

const ProductDetail = () => {
  const { selectedProduct, isProductDetailOpen, closeProductDetail, addToCart } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    // Visual feedback
    const button = document.getElementById('detail-add-to-cart');
    button.classList.add('animate-pulse', 'bg-green-600');
    setTimeout(() => {
      button.classList.remove('animate-pulse', 'bg-green-600');
    }, 600);
  };

  const handleVisitPage = () => {
    window.open(selectedProduct.platform.url, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  const discountPercentage = selectedProduct.price.original 
    ? Math.round(((selectedProduct.price.original - selectedProduct.price.current) / selectedProduct.price.original) * 100)
    : 0;

  return (
    <AnimatePresence>
      {isProductDetailOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProductDetail}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-10 rounded-3xl z-50 overflow-hidden flex flex-col md:flex-row"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'saturate(180%) blur(50px)',
              WebkitBackdropFilter: 'saturate(180%) blur(50px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.15)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeProductDetail}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>

            {/* Left Side - Images */}
            <div 
              className="w-full md:w-1/2 p-8 relative"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRight: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="relative h-full flex items-center justify-center">
                {/* Main Image */}
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  src={selectedProduct.images[currentImageIndex]}
                  alt={selectedProduct.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />

                {/* Image Navigation */}
                {selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:scale-110 transition-transform"
                      style={{
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <ChevronLeftIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:scale-110 transition-transform"
                      style={{
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <ChevronRightIcon className="h-5 w-5 text-white" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {selectedProduct.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProduct.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'w-8' 
                            : 'w-2 hover:w-3'
                        }`}
                        style={{
                          background: index === currentImageIndex 
                            ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
                            : 'rgba(255, 255, 255, 0.4)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Platform Badge */}
                <div 
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <span className="text-sm font-semibold" style={{ color: selectedProduct.platform.color }}>
                    {selectedProduct.platform.name}
                  </span>
                </div>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div 
                    className="absolute top-4 right-4 text-white text-sm font-bold px-3 py-1.5 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                    }}
                  >
                    -{discountPercentage}%
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div className="w-full md:w-1/2 p-8 overflow-y-auto">
              {/* Brand */}
              <p className="text-blue-300 font-semibold mb-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{selectedProduct.brand}</p>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
                {selectedProduct.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="flex items-center px-3 py-1.5 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9))',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
                  }}
                >
                  <StarIconSolid className="h-5 w-5 text-white" />
                  <span className="text-lg font-bold text-white ml-1">
                    {selectedProduct.rating.average}
                  </span>
                </div>
                <span className="text-white/70" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                  ({selectedProduct.rating.count.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    {selectedProduct.price.currency}{selectedProduct.price.current.toLocaleString()}
                  </span>
                  {selectedProduct.price.original && selectedProduct.price.original !== selectedProduct.price.current && (
                    <>
                      <span className="text-xl text-white/50 line-through" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                        {selectedProduct.price.currency}{selectedProduct.price.original.toLocaleString()}
                      </span>
                      <span className="text-green-300 font-semibold" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                        Save {selectedProduct.price.currency}{(selectedProduct.price.original - selectedProduct.price.current).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                {selectedProduct.availability ? (
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(22, 163, 74, 0.8))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    ✓ In Stock
                  </span>
                ) : (
                  <span 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <motion.button
                  id="detail-add-to-cart"
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.availability}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-semibold transition-all duration-200 ${
                    selectedProduct.availability
                      ? 'btn-apple text-white'
                      : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Add to Cart
                </motion.button>
                
                <motion.button
                  onClick={handleVisitPage}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 font-semibold rounded-2xl transition-all duration-200 text-gray-800"
                  style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  Visit {selectedProduct.platform.name}
                </motion.button>
              </div>

              {/* Tabs */}
              <div className="border-b border-white/20 mb-6">
                <div className="flex gap-6">
                  {['description', 'specifications', 'reviews', 'compare'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-1 font-semibold capitalize transition-all ${
                        activeTab === tab
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-white/70 hover:text-white'
                      }`}
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
                    >
                      {tab === 'compare' ? 'Price Compare' : tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'description' && (
                    <div className="text-white leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                      <p className="font-medium text-lg">{selectedProduct.description}</p>
                      <div 
                        className="mt-4 p-4 rounded-2xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <p className="text-sm text-white font-semibold" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                          <strong>Category:</strong> {selectedProduct.category}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specifications' && (
                    <div className="space-y-3">
                      {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                        <div 
                          key={key} 
                          className="flex justify-between py-3 px-4 rounded-xl"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <span className="text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{key}</span>
                          <span className="text-white font-semibold" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      <div 
                        className="rounded-2xl p-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIconSolid
                                key={i}
                                className={`h-6 w-6 ${
                                  i < Math.floor(selectedProduct.rating.average)
                                    ? 'text-yellow-400'
                                    : 'text-white/30'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-3xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
                            {selectedProduct.rating.average}
                          </span>
                        </div>
                        <p className="text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                          Based on {selectedProduct.rating.count.toLocaleString()} reviews
                        </p>
                      </div>
                      <div 
                        className="text-center py-6 rounded-2xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <p className="text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                          Reviews are available on the original platform
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'compare' && (
                    <PriceComparison currentProduct={selectedProduct} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetail;
