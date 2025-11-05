import React, { useState } from 'react';
import { StarIcon, ShoppingCartIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart, openProductDetail } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    
    // Visual feedback
    const button = e.currentTarget;
    button.classList.add('animate-pulse');
    setTimeout(() => button.classList.remove('animate-pulse'), 600);
  };

  const handleVisitPage = (e) => {
    e.stopPropagation();
    window.open(product.platform.url, '_blank');
  };

  const discountPercentage = product.price.original 
    ? Math.round(((product.price.original - product.price.current) / product.price.original) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      onClick={() => openProductDetail(product)}
      className="group relative glass-card overflow-hidden h-full flex flex-col"
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div 
          className="absolute top-4 left-5 z-10 text-white text-xs font-bold px-2 py-1 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
          }}
        >
          -{discountPercentage}%
        </div>
      )}

      {/* Platform Logo */}
      <div 
        className="absolute top-4 right-5 z-10 px-2 py-1 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <div
          className="flex items-center justify-center text-xs font-bold text-white rounded-lg px-2 py-1"
          style={{ backgroundColor: product.platform.color }}
        >
          {product.platform.name}
        </div>
      </div>

      {/* Product Image */}
      <div className="relative h-64 bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        <img
          src={product.images[0]}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!product.availability && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="px-5 py-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-semibold text-white line-clamp-2 mb-2 min-h-[3rem] flex items-start" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>
          {product.title}
        </h3>

        {/* Brand */}
        <p className="text-sm text-white/80 mb-2 font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div 
            className="flex items-center px-2 py-1 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.9))',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)'
            }}
          >
            <StarIcon className="h-4 w-4 text-white" />
            <span className="text-sm font-bold text-white ml-1">
              {product.rating.average}
            </span>
          </div>
          <span className="text-xs text-white/70 font-medium" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            ({product.rating.count.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}>
            {product.price.currency}{product.price.current.toLocaleString()}
          </span>
          {product.price.original && product.price.original !== product.price.current && (
            <span className="text-sm text-white/60 line-through" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              {product.price.currency}{product.price.original.toLocaleString()}
            </span>
          )}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow"></div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.availability}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full font-medium transition-all duration-300 ${
              product.availability
                ? 'btn-apple text-white'
                : 'bg-gray-200/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span className="text-sm">Add to Cart</span>
          </motion.button>
          
          <motion.button
            onClick={handleVisitPage}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-full transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-800" />
          </motion.button>
        </div>
      </div>

    </motion.div>
  );
};

export default ProductCard;
