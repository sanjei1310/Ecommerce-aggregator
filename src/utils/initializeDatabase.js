import { supabase } from '../config/supabase'
import { generateAdditionalProducts } from '../services/productGenerator'

// Transform mock data to match database schema
const transformProductForDatabase = (product) => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    current_price: product.price.current,
    original_price: product.price.original,
    currency: product.price.currency,
    images: product.images,
    rating_average: parseFloat(product.rating.average),
    rating_count: product.rating.count,
    platform_name: product.platform.name,
    platform_logo: product.platform.logo,
    platform_url: product.platform.url,
    platform_color: product.platform.color,
    category: product.category,
    brand: product.brand,
    availability: product.availability,
    specifications: product.specifications
  }
}

// Initial products data (your existing 20 products)
const initialProducts = [
  {
    id: "amz-001",
    title: "Samsung Galaxy S23 Ultra 5G (Green, 12GB, 256GB Storage)",
    description: "Latest flagship smartphone with S Pen, 200MP camera, and 5000mAh battery",
    price: { current: 124999, original: 149999, currency: "₹" },
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"],
    rating: { average: "4.5", count: 1247 },
    platform: { name: "Amazon", logo: "/images/logos/amazon.png", url: "https://amazon.in", color: "#FF9900" },
    category: "Electronics",
    brand: "Samsung",
    availability: true,
    specifications: {
      Display: "6.8 inch",
      RAM: "12GB",
      Storage: "256GB",
      Camera: "200MP"
    }
  },
  {
    id: "flp-002", 
    title: "Apple iPhone 15 Pro Max (Natural Titanium, 256GB)",
    description: "Revolutionary iPhone with titanium design, A17 Pro chip, and advanced camera system",
    price: { current: 156900, original: 159900, currency: "₹" },
    images: ["https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400"],
    rating: { average: "4.7", count: 892 },
    platform: { name: "Flipkart", logo: "/images/logos/flipkart.png", url: "https://flipkart.com", color: "#2874F0" },
    category: "Electronics",
    brand: "Apple",
    availability: true,
    specifications: {
      Display: "6.7 inch",
      RAM: "8GB",
      Storage: "256GB", 
      Camera: "48MP"
    }
  },
  {
    id: "myn-003",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation with premium sound quality and 30-hour battery",
    price: { current: 29990, original: 34990, currency: "₹" },
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
    rating: { average: "4.6", count: 567 },
    platform: { name: "Myntra", logo: "/images/logos/myntra.png", url: "https://myntra.com", color: "#FF3F6C" },
    category: "Electronics",
    brand: "Sony",
    availability: true,
    specifications: {
      Type: "Over-ear",
      Connectivity: "Bluetooth 5.2",
      Battery: "30 hours"
    }
  },
  {
    id: "aji-004",
    title: "Nike Air Jordan 1 Retro High OG",
    description: "Classic basketball sneakers with premium leather and iconic design",
    price: { current: 12795, original: 14995, currency: "₹" },
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
    rating: { average: "4.4", count: 234 },
    platform: { name: "AJIO", logo: "/images/logos/ajio.png", url: "https://ajio.com", color: "#2C4152" },
    category: "Fashion",
    brand: "Nike",
    availability: true,
    specifications: {
      Material: "Leather",
      Sole: "Rubber",
      Closure: "Lace-up"
    }
  }
]

export const initializeDatabase = async () => {
  try {
    console.log('🚀 Starting database initialization...')
    
    // Step 1: Create the products table
    console.log('📋 Creating products table...')
    
    const { error: tableError } = await supabase.rpc('create_products_table_if_not_exists')
    
    if (tableError && !tableError.message.includes('already exists')) {
      // If the RPC doesn't exist, create table manually
      const { error: createError } = await supabase.sql`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          current_price INTEGER NOT NULL,
          original_price INTEGER NOT NULL,
          currency TEXT DEFAULT '₹',
          images JSONB DEFAULT '[]',
          rating_average DECIMAL(2,1) DEFAULT 0,
          rating_count INTEGER DEFAULT 0,
          platform_name TEXT NOT NULL,
          platform_logo TEXT,
          platform_url TEXT,
          platform_color TEXT,
          category TEXT,
          brand TEXT,
          availability BOOLEAN DEFAULT true,
          specifications JSONB DEFAULT '{}',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
        CREATE INDEX IF NOT EXISTS idx_products_price ON products(current_price);
        CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating_average);
      `
      
      if (createError) {
        console.error('❌ Error creating table:', createError)
        return { success: false, error: createError }
      }
    }
    
    console.log('✅ Products table ready!')
    
    // Step 2: Check if data already exists
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1)
    
    if (checkError) {
      console.error('❌ Error checking existing data:', checkError)
      return { success: false, error: checkError }
    }
    
    if (existingProducts && existingProducts.length > 0) {
      console.log('📦 Products already exist in database!')
      return { success: true, message: 'Database already initialized' }
    }
    
    // Step 3: Generate all products (initial + generated)
    console.log('🎲 Generating product data...')
    const generatedProducts = generateAdditionalProducts(5, 96) // Generate 96 more products
    const allProducts = [...initialProducts, ...generatedProducts]
    
    console.log(`📦 Generated ${allProducts.length} products`)
    
    // Step 4: Transform and insert products in batches
    console.log('💾 Inserting products into database...')
    const transformedProducts = allProducts.map(transformProductForDatabase)
    
    // Insert in batches of 50 to avoid timeout
    const batchSize = 50
    let insertedCount = 0
    
    for (let i = 0; i < transformedProducts.length; i += batchSize) {
      const batch = transformedProducts.slice(i, i + batchSize)
      
      const { error: insertError } = await supabase
        .from('products')
        .insert(batch)
      
      if (insertError) {
        console.error(`❌ Error inserting batch ${Math.floor(i/batchSize) + 1}:`, insertError)
        return { success: false, error: insertError }
      }
      
      insertedCount += batch.length
      console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1} (${insertedCount}/${transformedProducts.length} products)`)
    }
    
    console.log('🎉 Database initialization completed successfully!')
    console.log(`📊 Total products inserted: ${insertedCount}`)
    
    return { 
      success: true, 
      message: `Successfully initialized database with ${insertedCount} products`,
      count: insertedCount 
    }
    
  } catch (error) {
    console.error('💥 Database initialization failed:', error)
    return { success: false, error }
  }
}

// Function to reset database (useful for development)
export const resetDatabase = async () => {
  try {
    console.log('🗑️ Resetting database...')
    
    const { error } = await supabase
      .from('products')
      .delete()
      .neq('id', 'impossible-id') // Delete all records
    
    if (error) {
      console.error('❌ Error resetting database:', error)
      return { success: false, error }
    }
    
    console.log('✅ Database reset completed!')
    return { success: true, message: 'Database reset successfully' }
    
  } catch (error) {
    console.error('💥 Database reset failed:', error)
    return { success: false, error }
  }
}