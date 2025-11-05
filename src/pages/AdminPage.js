import React from 'react'
import { useAuth } from '../context/AuthContext'
import DatabaseInitializer from '../components/admin/DatabaseInitializer'
import { motion } from 'framer-motion'

const AdminPage = () => {
  const { user } = useAuth()

  // Simple admin check - you can make this more sophisticated
  const adminEmails = ['kalihitesh1033@gmail.com', 'kalihitesh20333@gmail.com']
  const isAdmin = adminEmails.includes(user?.email)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-white/80">Please sign in to access admin panel.</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Admin Access Required</h2>
          <p className="text-white/80">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          🛠️ Admin Dashboard
        </h1>
        <p className="text-white/80">
          Manage your e-commerce platform database and settings
        </p>
      </div>

      <div className="grid gap-8">
        <DatabaseInitializer />
        
        {/* You can add more admin components here */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            📈 Quick Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-300">100+</div>
              <div className="text-white/80">Products</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-300">4</div>
              <div className="text-white/80">Platforms</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-300">8</div>
              <div className="text-white/80">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminPage