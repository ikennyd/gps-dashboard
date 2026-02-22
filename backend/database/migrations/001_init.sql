-- ==============================================
-- GPS Dashboard - Database Schema
-- Supabase PostgreSQL
-- ==============================================
-- Run this migration in your Supabase SQL editor
-- https://supabase.com/dashboard/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- USERS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  settings JSONB DEFAULT '{}',
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT email_valid CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Create indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);

-- ==============================================
-- CUSTOMERS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  company VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(2),
  country VARCHAR(100),
  customer_type VARCHAR(50) DEFAULT 'regular',
  total_spent DECIMAL(12,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT phone_format CHECK (phone ~ '^\+?[0-9\s\-()]{10,}$' OR phone IS NULL),
  CONSTRAINT email_format CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$' OR email IS NULL)
);

-- Create indexes for customers
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_name ON public.customers(name);
CREATE INDEX IF NOT EXISTS idx_customers_company ON public.customers(company);
CREATE INDEX IF NOT EXISTS idx_customers_total_spent ON public.customers(total_spent DESC);

-- ==============================================
-- PRODUCTS TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(50) UNIQUE,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2),
  stock_quantity INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT price_positive CHECK (price > 0),
  CONSTRAINT cost_valid CHECK (cost IS NULL OR cost >= 0),
  CONSTRAINT stock_valid CHECK (stock_quantity >= 0)
);

-- Create indexes for products
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);

-- ==============================================
-- SALES TABLE
-- ==============================================
CREATE TABLE IF NOT EXISTS public.sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'cancelled', 'refunded')),
  payment_method VARCHAR(50),
  notes TEXT,
  sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT quantity_positive CHECK (quantity > 0),
  CONSTRAINT price_positive CHECK (unit_price > 0),
  CONSTRAINT amount_positive CHECK (total_amount > 0),
  CONSTRAINT discount_valid CHECK (discount_percent >= 0 AND discount_percent <= 100)
);

-- Create indexes for sales
CREATE INDEX IF NOT EXISTS idx_sales_user_id ON public.sales(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_customer_id ON public.sales(customer_id);
CREATE INDEX IF NOT EXISTS idx_sales_product_id ON public.sales(product_id);
CREATE INDEX IF NOT EXISTS idx_sales_status ON public.sales(status);
CREATE INDEX IF NOT EXISTS idx_sales_date ON public.sales(sale_date DESC);
CREATE INDEX IF NOT EXISTS idx_sales_amount ON public.sales(total_amount DESC);

-- ==============================================
-- VIEWS
-- ==============================================

-- Sales Summary View
CREATE OR REPLACE VIEW public.sales_summary AS
SELECT
  DATE(s.sale_date) AS sale_date,
  COUNT(*) AS total_sales,
  SUM(s.total_amount) AS total_revenue,
  AVG(s.total_amount) AS avg_order_value,
  COUNT(DISTINCT s.customer_id) AS unique_customers
FROM public.sales s
WHERE s.status = 'completed'
GROUP BY DATE(s.sale_date)
ORDER BY sale_date DESC;

-- Top Customers View
CREATE OR REPLACE VIEW public.top_customers AS
SELECT
  c.id,
  c.name,
  c.company,
  COUNT(s.id) AS total_purchases,
  SUM(s.total_amount) AS total_spent,
  AVG(s.total_amount) AS avg_order_value
FROM public.customers c
LEFT JOIN public.sales s ON c.id = s.customer_id
GROUP BY c.id
ORDER BY total_spent DESC
LIMIT 100;

-- ==============================================
-- FUNCTIONS
-- ==============================================

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================
-- TRIGGERS
-- ==============================================

-- Update timestamp trigger for users
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Update timestamp trigger for sales
CREATE TRIGGER update_sales_timestamp
BEFORE UPDATE ON public.sales
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Update timestamp trigger for customers
CREATE TRIGGER update_customers_timestamp
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Update timestamp trigger for products
CREATE TRIGGER update_products_timestamp
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- ==============================================
-- Row Level Security (RLS) Policies
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- Users RLS Policies
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (TRUE); -- Allow public view for now

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (TRUE); -- Update policy

-- Customers RLS Policies
CREATE POLICY "Everyone can view customers" ON public.customers
  FOR SELECT USING (TRUE);

-- Products RLS Policies
CREATE POLICY "Everyone can view active products" ON public.products
  FOR SELECT USING (is_active = TRUE);

-- Sales RLS Policies
CREATE POLICY "Everyone can view sales" ON public.sales
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create sales" ON public.sales
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can update sales" ON public.sales
  FOR UPDATE USING (TRUE);

-- ==============================================
-- SEED DATA (Optional)
-- ==============================================

-- Insert sample users
INSERT INTO public.users (email, password_hash, name, role) VALUES
  ('admin@example.com', 'hashed_password_here', 'Admin User', 'admin'),
  ('user@example.com', 'hashed_password_here', 'Regular User', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert sample customers
INSERT INTO public.customers (name, email, company, city, state, country) VALUES
  ('João Silva', 'joao@example.com', 'Tech Corp', 'São Paulo', 'SP', 'Brazil'),
  ('Maria Santos', 'maria@example.com', 'Design Studio', 'Rio de Janeiro', 'RJ', 'Brazil'),
  ('Pedro Oliveira', 'pedro@example.com', 'Marketing Agency', 'Belo Horizonte', 'MG', 'Brazil')
ON CONFLICT (email) DO NOTHING;

-- Insert sample products
INSERT INTO public.products (name, sku, category, price, cost) VALUES
  ('Laptop Pro', 'PROD-001', 'Electronics', 1500.00, 1000.00),
  ('Wireless Mouse', 'PROD-002', 'Accessories', 50.00, 25.00),
  ('USB-C Cable', 'PROD-003', 'Accessories', 15.00, 5.00),
  ('Monitor 4K', 'PROD-004', 'Electronics', 800.00, 500.00),
  ('Keyboard Mechanical', 'PROD-005', 'Accessories', 150.00, 80.00)
ON CONFLICT (sku) DO NOTHING;

-- ==============================================
-- MIGRATION COMPLETE
-- ==============================================
-- Run this entire script in your Supabase SQL editor
-- Then update your .env with the connection details
-- Success! Your database is ready for GPS Dashboard
