import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const UserProfile = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    setIsDropdownOpen(false)
  }

  if (!user) return null

  // Get username from user metadata or fallback to email
  const displayName = user.user_metadata?.username || user.user_metadata?.display_name || user.email?.split('@')[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 text-white hover:text-white/80 focus:outline-none"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
        <span className="hidden md:block text-sm font-medium">
          {displayName}
        </span>
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
          >
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <p className="font-medium">{displayName}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={() => {
                navigate('/profile')
                setIsDropdownOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile Settings
            </button>
            <button
              onClick={() => setIsDropdownOpen(false)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Order History
            </button>
            {['kalihitesh1033@gmail.com', 'kalihitesh20333@gmail.com'].includes(user.email) && (
              <button
                onClick={() => {
                  navigate('/admin')
                  setIsDropdownOpen(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
              >
                🛠️ Admin Panel
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserProfile