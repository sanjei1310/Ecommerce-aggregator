import React, { createContext, useState, useContext, useEffect } from 'react';
import { DatabaseService } from '../services/database';
import { getAllProducts, searchProducts } from '../services/mockDataService';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Products state
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 250000,
    categories: [],
    brands: [],
    minRating: 0,
    platforms: [],
    sortBy: 'relevance'
  });
  
  // Cart state - user-specific
  const [cart, setCart] = useState([]);
  
  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  
  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Try to load from database first
        const dbResult = await DatabaseService.getProducts();
        
        if (dbResult.success && dbResult.data.length > 0) {
          // Transform database products to match expected format
          const transformedProducts = dbResult.data.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: {
              current: product.current_price,
              original: product.original_price,
              currency: product.currency
            },
            images: product.images,
            rating: {
              average: product.rating_average.toString(),
              count: product.rating_count
            },
            platform: {
              name: product.platform_name,
              logo: product.platform_logo,
              url: product.platform_url,
              color: product.platform_color
            },
            category: product.category,
            brand: product.brand,
            availability: product.availability,
            specifications: product.specifications
          }));
          
          setAllProducts(transformedProducts);
          setFilteredProducts(transformedProducts);
        } else {
          // Fallback to mock data if database is empty
          console.log('Database empty, using mock data');
          const products = getAllProducts();
          setAllProducts(products);
          setFilteredProducts(products);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to mock data on error
        const products = getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Apply search and filters
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        if (allProducts.length === 0) return;
        
        // Use database search if available, otherwise use local filtering
        if (searchQuery.trim()) {
          const dbResult = await DatabaseService.searchProducts(searchQuery);
          if (dbResult.success) {
            // Transform database results
            const transformedResults = dbResult.data.map(product => ({
              id: product.id,
              title: product.title,
              description: product.description,
              price: {
                current: product.current_price,
                original: product.original_price,
                currency: product.currency
              },
              images: product.images,
              rating: {
                average: product.rating_average.toString(),
                count: product.rating_count
              },
              platform: {
                name: product.platform_name,
                logo: product.platform_logo,
                url: product.platform_url,
                color: product.platform_color
              },
              category: product.category,
              brand: product.brand,
              availability: product.availability,
              specifications: product.specifications
            }));
            setFilteredProducts(transformedResults);
          } else {
            // Fallback to local search
            const results = searchProducts(searchQuery, filters, allProducts);
            setFilteredProducts(results);
          }
        } else {
          // No search query, show all products with filters applied
          if (allProducts.length > 0) {
            const results = searchProducts('', filters, allProducts);
            setFilteredProducts(results);
          } else {
            // If no products loaded yet, try to get all from database
            const dbResult = await DatabaseService.getProducts();
            if (dbResult.success) {
              const transformedResults = dbResult.data.map(product => ({
                id: product.id,
                title: product.title,
                description: product.description,
                price: {
                  current: product.current_price,
                  original: product.original_price,
                  currency: product.currency
                },
                images: product.images,
                rating: {
                  average: product.rating_average.toString(),
                  count: product.rating_count
                },
                platform: {
                  name: product.platform_name,
                  logo: product.platform_logo,
                  url: product.platform_url,
                  color: product.platform_color
                },
                category: product.category,
                brand: product.brand,
                availability: product.availability,
                specifications: product.specifications
              }));
              setFilteredProducts(transformedResults);
            }
          }
        }
      } catch (error) {
        console.error('Error applying filters:', error);
        // Fallback to local filtering
        const results = searchProducts(searchQuery, filters);
        setFilteredProducts(results);
      } finally {
        setLoading(false);
      }
    };
    
    const debounceTimer = setTimeout(applyFilters, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filters, allProducts]);
  
  // Load user-specific cart when user changes
  useEffect(() => {
    if (user?.email) {
      const userCartKey = `cart_${user.email}`;
      const savedCart = localStorage.getItem(userCartKey);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      // Clear cart when user logs out
      setCart([]);
    }
  }, [user]);

  // Save user-specific cart to localStorage
  useEffect(() => {
    if (user?.email) {
      const userCartKey = `cart_${user.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cart));
    }
  }, [cart, user]);
  
  // Cart functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };

  const clearUserCart = (userEmail) => {
    if (userEmail) {
      const userCartKey = `cart_${userEmail}`;
      localStorage.removeItem(userCartKey);
    }
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price.current * item.quantity), 0);
  };
  
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  // Filter functions
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 250000,
      categories: [],
      brands: [],
      minRating: 0,
      platforms: [],
      sortBy: 'relevance'
    });
  };
  
  // Product detail functions
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };
  
  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };
  
  const value = {
    // Products
    allProducts,
    filteredProducts,
    loading,
    
    // Search and filters
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    resetFilters,
    
    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    clearUserCart,
    getCartTotal,
    getCartItemCount,
    isCartOpen,
    setIsCartOpen,
    
    // Product detail
    selectedProduct,
    isProductDetailOpen,
    openProductDetail,
    closeProductDetail
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
