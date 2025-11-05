import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { UserIcon, EnvelopeIcon, CalendarIcon, PencilIcon } from '@heroicons/react/24/outline'
import EditProfileModal from '../components/profile/EditProfileModal'

const ProfilePage = () => {
  const { user } = useAuth()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    )
  }

  // Get username from user metadata or fallback to email
  const displayName = user.user_metadata?.username || user.user_metadata?.display_name || user.email?.split('@')[0]

  const handleProfileUpdate = () => {
    // The user object will be automatically updated by Supabase auth state
    // This function can be used for any additional actions after profile update
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-8"
    >
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {displayName}!
              </h1>
              <p className="text-white/80">
                Manage your account and preferences
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            <PencilIcon className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <UserIcon className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-sm text-white/60">Username</p>
                    <p className="text-white font-medium">{displayName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-5 h-5 text-white/60" />
                  <div>
                    <p className="text-sm text-white/60">Member since</p>
                    <p className="text-white font-medium">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                  Order History
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                  Saved Items
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                  Account Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleProfileUpdate}
      />
    </motion.div>
  )
}

export default ProfilePage