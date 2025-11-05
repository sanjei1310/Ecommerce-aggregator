-- Run these SQL commands in your Supabase SQL Editor
-- Go to: Supabase Dashboard > SQL Editor > New Query

-- 1. Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  total_amount INTEGER NOT NULL,
  currency TEXT DEFAULT '₹',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Insert sample data into user_profiles
INSERT INTO user_profiles (email, username, full_name, phone) VALUES
('kalihitesh20333@gmail.com', 'KH10', 'Kalihitesh', '+91-9876543210'),
('john.doe@example.com', 'johndoe', 'John Doe', '+91-9876543211'),
('jane.smith@example.com', 'janesmith', 'Jane Smith', '+91-9876543212'),
('admin@shopaggregator.com', 'admin', 'Admin User', '+91-9876543213');

-- 7. Insert sample data into categories
INSERT INTO categories (name, description, image_url) VALUES
('Electronics', 'Electronic devices and gadgets', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'),
('Fashion', 'Clothing, shoes, and accessories', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'),
('Home & Kitchen', 'Home appliances and kitchen items', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'),
('Sports & Fitness', 'Sports equipment and fitness gear', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'),
('Books & Media', 'Books, movies, and digital media', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400');

-- 8. Insert sample data into brands
INSERT INTO brands (name, description, logo_url, website_url) VALUES
('Apple', 'Premium technology products', 'https://logo.clearbit.com/apple.com', 'https://apple.com'),
('Samsung', 'Electronics and mobile devices', 'https://logo.clearbit.com/samsung.com', 'https://samsung.com'),
('Nike', 'Sports and lifestyle brand', 'https://logo.clearbit.com/nike.com', 'https://nike.com'),
('Sony', 'Electronics and entertainment', 'https://logo.clearbit.com/sony.com', 'https://sony.com'),
('Adidas', 'Sports and lifestyle brand', 'https://logo.clearbit.com/adidas.com', 'https://adidas.com');

-- 9. Insert sample data into orders
INSERT INTO orders (user_email, order_number, status, total_amount, payment_status) VALUES
('kalihitesh20333@gmail.com', 'ORD-2024-001', 'delivered', 25990, 'paid'),
('john.doe@example.com', 'ORD-2024-002', 'shipped', 15999, 'paid'),
('jane.smith@example.com', 'ORD-2024-003', 'pending', 8999, 'pending'),
('kalihitesh20333@gmail.com', 'ORD-2024-004', 'delivered', 45990, 'paid');

-- 10. Insert sample data into reviews
INSERT INTO reviews (user_email, product_id, rating, title, comment) VALUES
('kalihitesh20333@gmail.com', 'amz-001', 5, 'Excellent product!', 'Great quality and fast delivery. Highly recommended!'),
('john.doe@example.com', 'flp-001', 4, 'Good value for money', 'Works as expected. Good build quality.'),
('jane.smith@example.com', 'amz-002', 5, 'Amazing sound quality', 'Best headphones I have ever used!'),
('kalihitesh20333@gmail.com', 'myn-001', 4, 'Stylish and comfortable', 'Great shoes, very comfortable for daily wear.');

-- 11. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Success message
SELECT 'Database setup complete! 5 tables created with sample data.' as message;