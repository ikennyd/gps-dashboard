/**
 * Supabase Database Connection
 * PostgreSQL client for GPS Dashboard
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Test database connection
 */
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }

    console.log('✅ Database connection successful');
    return true;
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    return false;
  }
};

/**
 * Get all users
 */
const getUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) throw error;
  return data;
};

/**
 * Get user by ID
 */
const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

/**
 * Create user
 */
const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select();

  if (error) throw error;
  return data[0];
};

/**
 * Get sales with filters
 */
const getSales = async (filters = {}) => {
  let query = supabase.from('sales').select('*');

  if (filters.userId) {
    query = query.eq('user_id', filters.userId);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.startDate) {
    query = query.gte('sale_date', filters.startDate);
  }
  if (filters.endDate) {
    query = query.lte('sale_date', filters.endDate);
  }

  query = query.order('sale_date', { ascending: false });

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

/**
 * Get sales metrics
 */
const getSalesMetrics = async (userId) => {
  let query = supabase
    .from('sales')
    .select('total_amount')
    .eq('status', 'completed');

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) throw error;

  const metrics = {
    totalSales: data.reduce((sum, sale) => sum + sale.total_amount, 0),
    salesCount: data.length,
    averageOrder: data.length > 0 ? data.reduce((sum, sale) => sum + sale.total_amount, 0) / data.length : 0,
    todaySales: data
      .filter(sale => {
        const today = new Date().toDateString();
        return new Date(sale.created_at).toDateString() === today;
      })
      .reduce((sum, sale) => sum + sale.total_amount, 0)
  };

  return metrics;
};

/**
 * Create sale
 */
const createSale = async (saleData) => {
  const { data, error } = await supabase
    .from('sales')
    .insert([saleData])
    .select();

  if (error) throw error;
  return data[0];
};

/**
 * Get customers
 */
const getCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return data;
};

/**
 * Get products
 */
const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return data;
};

module.exports = {
  supabase,
  testConnection,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  getSales,
  getSalesMetrics,
  createSale,
  getCustomers,
  getProducts
};
