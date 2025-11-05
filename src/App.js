import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CartSlider from './components/cart/CartSlider';
import ProductDetail from './components/product/ProductDetail';
import { motion } from 'framer-motion';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          {/* Public route for password reset */}
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Protected routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="min-h-screen relative overflow-x-hidden">
                {/* iOS-style vibrant gradient background */}
                <div className="fixed inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600" />
                  <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-full blur-[100px] mix-blend-screen" />
                  <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/40 to-blue-500/40 rounded-full blur-[80px] mix-blend-screen" />
                  <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-[90px] mix-blend-screen" />
                  <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-[70px] mix-blend-screen" />
                </div>
                
                <Header />
                
                <motion.main 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]"
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Routes>
                </motion.main>
                
                <Footer />
                <CartSlider />
                <ProductDetail />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
