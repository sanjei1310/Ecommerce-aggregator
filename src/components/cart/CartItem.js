import React from 'react';
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useAppContext();

  const handleIncrement = () => {
    updateCartQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-4 flex gap-3"
    >
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-white line-clamp-2 mb-1" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
          {item.title}
        </h4>
        <p className="text-xs text-white/70 mb-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{item.brand}</p>
        
        {/* Price and Quantity */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              ₹{(item.price.current * item.quantity).toLocaleString()}
            </span>
            {item.quantity > 1 && (
              <span className="text-xs text-white/60" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                (₹{item.price.current.toLocaleString()} each)
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrement}
              className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <MinusIcon className="h-4 w-4 text-white" />
            </motion.button>
            
            <span className="px-2 py-1 min-w-[2rem] text-center text-sm font-medium text-white" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              {item.quantity}
            </span>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleIncrement}
              className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <PlusIcon className="h-4 w-4 text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleRemove}
        className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-red-500/30 rounded-full transition-colors group"
      >
        <TrashIcon className="h-4 w-4 text-white/70 group-hover:text-red-400" />
      </motion.button>
    </motion.div>
  );
};

export default CartItem;
