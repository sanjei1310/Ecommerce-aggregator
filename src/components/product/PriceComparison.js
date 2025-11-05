import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useAppContext } from '../../context/AppContext'

const PriceComparison = ({ currentProduct }) => {
  const { allProducts, addToCart } = useAppContext()
  const [similarProducts, setSimilarProducts] = useState([])

  useEffect(() => {
    if (!currentProduct || !allProducts.length) return

    // Find similar products based on title similarity and brand
    const findSimilarProducts = () => {
      const currentTitle = currentProduct.title.toLowerCase()
      const currentBrand = currentProduct.brand.toLowerCase()
      
      // Extract key words from the title (remove common words)
      const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'within', 'without', 'toward', 'towards', 'until', 'since', 'while', 'although', 'because', 'if', 'when', 'where', 'how', 'what', 'which', 'who', 'whom', 'whose', 'why']
      
      const titleWords = currentTitle
        .split(' ')
        .filter(word => word.length > 2 && !commonWords.includes(word))
        .slice(0, 5) // Take first 5 meaningful words

      const similar = allProducts.filter(product => {
        if (product.id === currentProduct.id) return false
        
        const productTitle = product.title.toLowerCase()
        const productBrand = product.brand.toLowerCase()
        
        // Check if same brand
        if (productBrand === currentBrand) {
          // For same brand, check if titles have common words
          const matchingWords = titleWords.filter(word => productTitle.includes(word))
          return matchingWords.length >= 2 // At least 2 matching words
        }
        
        // For different brands, need more strict matching
        const matchingWords = titleWords.filter(word => productTitle.includes(word))
        return matchingWords.length >= 3 // At least 3 matching words
      })

      // Sort by price (lowest first) and limit to 6 results
      return similar
        .sort((a, b) => a.price.current - b.price.current)
        .slice(0, 6)
    }

    setSimilarProducts(findSimilarProducts())
  }, [currentProduct, allProducts])

  if (!similarProducts.length) return null

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleVisitPlatform = (product) => {
    window.open(product.platform.url, '_blank')
  }

  // Find the best price
  const bestPrice = Math.min(...similarProducts.map(p => p.price.current), currentProduct.price.current)
  const currentIsBest = currentProduct.price.current === bestPrice

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
          💰 Price Comparison
        </h3>
        <div 
          className="px-4 py-2 rounded-xl"
          style={{
            background: 'rgba(34, 197, 94, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}
        >
          <span className="text-green-300 font-semibold text-sm">
            Best Price: ₹{bestPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Current Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border-2 ${
            currentIsBest 
              ? 'border-green-400 bg-green-500/10' 
              : 'border-white/20 bg-white/5'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={currentProduct.images[0]} 
                alt={currentProduct.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span 
                    className="px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{ 
                      backgroundColor: currentProduct.platform.color,
                      color: 'white'
                    }}
                  >
                    {currentProduct.platform.name}
                  </span>
                  {currentIsBest && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      BEST PRICE
                    </span>
                  )}
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    CURRENT
                  </span>
                </div>
                <p className="text-white font-medium text-sm truncate max-w-xs">
                  {currentProduct.title}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                ₹{currentProduct.price.current.toLocaleString()}
              </div>
              {currentProduct.price.original && currentProduct.price.original !== currentProduct.price.current && (
                <div className="text-sm text-white/60 line-through">
                  ₹{currentProduct.price.original.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Similar Products */}
        {similarProducts.map((product, index) => {
          const isBestPrice = product.price.current === bestPrice
          const savings = product.price.current - bestPrice
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border ${
                isBestPrice 
                  ? 'border-green-400 bg-green-500/10' 
                  : 'border-white/20 bg-white/5'
              }`}
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="px-3 py-1 rounded-lg text-sm font-semibold"
                        style={{ 
                          backgroundColor: product.platform.color,
                          color: 'white'
                        }}
                      >
                        {product.platform.name}
                      </span>
                      {isBestPrice && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          BEST PRICE
                        </span>
                      )}
                      {savings > 0 && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          +₹{savings.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-white font-medium text-sm truncate max-w-xs">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-400 text-sm">★ {product.rating.average}</span>
                      <span className="text-white/60 text-xs">({product.rating.count})</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      ₹{product.price.current.toLocaleString()}
                    </div>
                    {product.price.original && product.price.original !== product.price.current && (
                      <div className="text-sm text-white/60 line-through">
                        ₹{product.price.original.toLocaleString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCartIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleVisitPlatform(product)}
                      className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                      title={`Visit ${product.platform.name}`}
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <div 
        className="mt-6 p-4 rounded-2xl"
        style={{
          background: 'rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300 font-semibold">
              💡 Found {similarProducts.length + 1} options across {new Set([currentProduct.platform.name, ...similarProducts.map(p => p.platform.name)]).size} platforms
            </p>
            <p className="text-white/80 text-sm mt-1">
              Save up to ₹{Math.max(...similarProducts.map(p => p.price.current), currentProduct.price.current) - bestPrice} by choosing the best price!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceComparison