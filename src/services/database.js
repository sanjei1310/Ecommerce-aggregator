import { supabase } from '../config/supabase'

// Database service for products
export class DatabaseService {
  
  // Create products table (run this once to set up the database)
  static async createProductsTable() {
    const { data, error } = await supabase.rpc('create_products_table')
    if (error) {
      console.error('Error creating products table:', error)
      return { success: false, error }
    }
    return { success: true, data }
  }

  // Insert products into database
  static async insertProducts(products) {
    const { data, error } = await supabase
      .from('products')
      .insert(products)
      .select()
    
    if (error) {
      console.error('Error inserting products:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  }

  // Get all products with optional filters
  static async getProducts(filters = {}) {
    let query = supabase.from('products').select('*')
    
    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category)
    }
    
    if (filters.brand) {
      query = query.eq('brand', filters.brand)
    }
    
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }
    
    if (filters.minPrice) {
      query = query.gte('current_price', filters.minPrice)
    }
    
    if (filters.maxPrice) {
      query = query.lte('current_price', filters.maxPrice)
    }
    
    // Sort by created_at desc by default
    query = query.order('created_at', { ascending: false })
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching products:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  }

  // Get single product by ID
  static async getProduct(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching product:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  }

  // Search products
  static async searchProducts(searchTerm) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error searching products:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  }

  // Get products by category
  static async getProductsByCategory(category) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products by category:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  }

  // Get featured/popular products
  static async getFeaturedProducts(limit = 10) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .gte('rating_average', 4.0)
      .order('rating_count', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching featured products:', error)
      return { success: false, error }
    }
    
    return { success: true, data }
  }
}