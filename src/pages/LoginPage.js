import React, { useState } from 'react'
import { motion } from 'framer-motion'
import LoginForm from '../components/auth/LoginForm'
import SignUpForm from '../components/auth/SignUpForm'
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

const LoginPage = () => {
  const [currentView, setCurrentView] = useState('login') // 'login', 'signup', 'forgot'

  const toggleMode = () => {
    setCurrentView(currentView === 'login' ? 'signup' : 'login')
  }

  const showForgotPassword = () => {
    setCurrentView('forgot')
  }

  const backToLogin = () => {
    setCurrentView('login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600" />
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full blur-[80px] mix-blend-screen" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-[90px] mix-blend-screen" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-[70px] mix-blend-screen" />
      </div>

      {/* Logo */}
      <motion.div 
        className="absolute top-8 left-8 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <h1 className="text-2xl font-bold text-white">
          ShopAggregator
        </h1>
      </motion.div>

      {/* Auth Forms */}
      <div className="w-full max-w-md">
        {currentView === 'login' && (
          <LoginForm 
            onToggleMode={toggleMode} 
            onForgotPassword={showForgotPassword}
          />
        )}
        {currentView === 'signup' && (
          <SignUpForm onToggleMode={toggleMode} />
        )}
        {currentView === 'forgot' && (
          <ForgotPasswordForm onBack={backToLogin} />
        )}
      </div>

      {/* Welcome Text */}
      <motion.div 
        className="absolute bottom-8 left-8 right-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-white/80 text-lg">
          Welcome to ShopAggregator - Your one-stop destination for the best deals across all platforms
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage