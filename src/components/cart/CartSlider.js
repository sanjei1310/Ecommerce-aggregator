import React from 'react';
import { XMarkIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAppContext } from '../../context/AppContext';
import CartItem from './CartItem';
import { motion, AnimatePresence } from 'framer-motion';

const CartSlider = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    getCartTotal, 
    clearCart,
    getCartItemCount 
  } = useAppContext();

  const cartTotal = getCartTotal();
  const itemCount = getCartItemCount();

  // Group cart items by platform
  const groupedCart = cart.reduce((acc, item) => {
    const platform = item.platform.name;
    if (!acc[platform]) {
      acc[platform] = {
        items: [],
        total: 0,
        color: item.platform.color,
        url: item.platform.url
      };
    }
    acc[platform].items.push(item);
    acc[platform].total += item.price.current * item.quantity;
    return acc;
  }, {});

  const handleVisitPlatform = (url) => {
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Cart Slider */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 z-50 flex flex-col"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'saturate(180%) blur(50px)',
              WebkitBackdropFilter: 'saturate(180%) blur(50px)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6" style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div className="flex items-center gap-3">
                <ShoppingBagIcon className="h-6 w-6 text-white" />
                <h2 className="text-xl font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>
                  Your Cart
                  {itemCount > 0 && (
                    <span className="ml-2 text-sm font-normal text-white/70" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                      ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-white/70" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full p-6"
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
                    <ShoppingBagIcon className="h-12 w-12 text-white/70" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>Your cart is empty</h3>
                  <p className="text-white/70 text-center" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    Start adding products to see them here
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-2 text-white font-medium rounded-lg transition-colors"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Clear Cart Button */}
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 font-medium transition-colors"
                      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Clear all items
                    </button>
                  )}

                  {/* Grouped Cart Items */}
                  {Object.entries(groupedCart).map(([platform, data]) => (
                    <motion.div
                      key={platform}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-2xl overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {/* Platform Header */}
                      <div 
                        className="px-4 py-2 flex items-center justify-between"
                        style={{ 
                          backgroundColor: `${data.color}20`,
                          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <div>
                          <span className="font-semibold text-white" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{platform}</span>
                          <span className="ml-2 text-sm text-white/70" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                            ({data.items.length} {data.items.length === 1 ? 'item' : 'items'})
                          </span>
                        </div>
                        <span className="font-semibold text-white" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                          ₹{data.total.toLocaleString()}
                        </span>
                      </div>

                      {/* Platform Items */}
                      <div className="divide-y divide-gray-100">
                        {data.items.map((item) => (
                          <CartItem key={item.id} item={item} />
                        ))}
                      </div>

                      {/* Visit Platform Button */}
                      <div className="p-3" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                        <button
                          onClick={() => handleVisitPlatform(data.url)}
                          className="w-full py-2 text-sm font-medium text-white hover:text-white/80 transition-colors"
                          style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
                        >
                          Visit {platform} to checkout →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total */}
            {cart.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-white" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Total Amount</span>
                  <span className="text-2xl font-bold text-white" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)' }}>
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-white/70 text-center" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    * Checkout will be done on respective platforms
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSlider;
