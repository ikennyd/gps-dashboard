#!/usr/bin/env node

/**
 * Test Supabase Connection
 * Verify credentials and database setup
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log(`
╔════════════════════════════════════════════════════════════╗
║          🔗 Testing Supabase Connection                    ║
╚════════════════════════════════════════════════════════════╝
`);

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Missing Supabase credentials in .env');
  console.error('   Please add:');
  console.error('   - SUPABASE_URL');
  console.error('   - SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.log('📍 Credentials found:');
console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`);
console.log(`   Key: ${supabaseKey.substring(0, 20)}...`);

// Initialize client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔄 Testing database connection...');

    // Try to query users table
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      throw error;
    }

    console.log('✅ Database connection successful!');
    return true;

  } catch (err) {
    console.error('❌ Connection failed:', err.message);

    if (err.message.includes('relation "public.users" does not exist')) {
      console.log('\n⚠️  Tables not found. You need to run migrations:');
      console.log('   1. Go to: https://supabase.com/dashboard/sql');
      console.log('   2. Copy contents of: backend/database/migrations/001_init.sql');
      console.log('   3. Paste in SQL editor and click RUN');
    }

    return false;
  }
}

async function testData() {
  try {
    console.log('\n🔄 Fetching sample data...');

    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5);

    if (usersError) throw usersError;

    const { data: customers, error: customersError } = await supabase
      .from('customers')
      .select('*')
      .limit(5);

    if (customersError) throw customersError;

    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5);

    if (productsError) throw productsError;

    const { data: sales, error: salesError } = await supabase
      .from('sales')
      .select('*')
      .limit(5);

    if (salesError) throw salesError;

    console.log(`✅ Users: ${users?.length || 0} records`);
    console.log(`✅ Customers: ${customers?.length || 0} records`);
    console.log(`✅ Products: ${products?.length || 0} records`);
    console.log(`✅ Sales: ${sales?.length || 0} records`);

    return {
      users: users?.length || 0,
      customers: customers?.length || 0,
      products: products?.length || 0,
      sales: sales?.length || 0
    };

  } catch (err) {
    console.error('⚠️  Could not fetch data:', err.message);
    return null;
  }
}

async function main() {
  const connectionOk = await testConnection();

  if (connectionOk) {
    await testData();
  }

  console.log(`
╔════════════════════════════════════════════════════════════╗
`);

  if (connectionOk) {
    console.log('║  ✅ SUPABASE READY - Start development!                  ║');
    console.log('║                                                            ║');
    console.log('║  npm run dev:backend   # Start backend (port 5000)         ║');
    console.log('║  npm run dev:frontend  # Start frontend (port 3000)        ║');
  } else {
    console.log('║  ❌ Setup incomplete - Follow steps above                  ║');
  }

  console.log(`╚════════════════════════════════════════════════════════════╝
`);

  process.exit(connectionOk ? 0 : 1);
}

main().catch(console.error);
