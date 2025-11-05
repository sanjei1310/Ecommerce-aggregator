import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { initializeDatabase, resetDatabase } from '../../utils/initializeDatabase'
import { createAdditionalTables, insertSampleData } from '../../utils/createAdditionalTables'
import { DatabaseService } from '../../services/database'

const DatabaseInitializer = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [productCount, setProductCount] = useState(0)
  const [tableCount, setTableCount] = useState(0)

  const handleInitialize = async () => {
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const result = await initializeDatabase()
      
      if (result.success) {
        setMessage(result.message)
        setProductCount(result.count || 0)
        
        // Fetch current product count
        const productsResult = await DatabaseService.getProducts()
        if (productsResult.success) {
          setProductCount(productsResult.data.length)
        }
      } else {
        setError(result.error?.message || 'Failed to initialize database')
      }
    } catch (err) {
      setError(err.message)
    }
    
    setLoading(false)
  }

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset the database? This will delete all products.')) {
      return
    }
    
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const result = await resetDatabase()
      
      if (result.success) {
        setMessage(result.message)
        setProductCount(0)
      } else {
        setError(result.error?.message || 'Failed to reset database')
      }
    } catch (err) {
      setError(err.message)
    }
    
    setLoading(false)
  }

  const handleCheckProducts = async () => {
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const result = await DatabaseService.getProducts()
      
      if (result.success) {
        setProductCount(result.data.length)
        setMessage(`Found ${result.data.length} products in database`)
      } else {
        setError(result.error?.message || 'Failed to fetch products')
      }
    } catch (err) {
      setError(err.message)
    }
    
    setLoading(false)
  }

  const handleCreateTables = async () => {
    setLoading(true)
    setMessage('')
    setError('')
    
    try {
      const result = await createAdditionalTables()
      
      if (result.success) {
        setMessage('Database tables created and sample data inserted!')
        setTableCount(6) // Number of tables created (categories, brands, platforms, coupons, orders, reviews)
      } else {
        setError(result.error?.message || 'Failed to create tables')
      }
    } catch (err) {
      setError(err.message)
    }
    
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          🗄️ Database Management
        </h2>
        
        <div className="space-y-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Database Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/80">
                  Products: <span className="font-bold text-yellow-300">{productCount}</span>
                </p>
              </div>
              <div>
                <p className="text-white/80">
                  Tables: <span className="font-bold text-blue-300">{tableCount}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={handleCreateTables}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              '🏗️'
            )}
            Create Tables
          </button>

          <button
            onClick={handleInitialize}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              '🚀'
            )}
            Add Products
          </button>

          <button
            onClick={handleCheckProducts}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              '📊'
            )}
            Check Status
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              '🗑️'
            )}
            Reset All
          </button>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <h4 className="text-white font-semibold mb-2">Instructions:</h4>
          <ul className="text-white/80 text-sm space-y-1">
            <li>• <strong>Create Tables:</strong> Creates all database tables (13 tables)</li>
            <li>• <strong>Add Products:</strong> Adds 100+ products to database</li>
            <li>• <strong>Check Status:</strong> Shows current database status</li>
            <li>• <strong>Reset All:</strong> Deletes all data (use carefully!)</li>
          </ul>
          
          <div className="mt-4 p-3 bg-blue-500/20 rounded border border-blue-400/30">
            <h5 className="text-blue-200 font-medium mb-1">Tables Created:</h5>
            <p className="text-blue-100/80 text-xs">
              products, user_profiles, categories, brands, platforms, wishlists, orders, order_items, 
              reviews, price_history, product_views, search_queries, notifications, coupons
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DatabaseInitializer