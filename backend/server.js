#!/usr/bin/env node

/**
 * GPS Dashboard Backend Server
 * Express.js + Supabase + JWT Authentication
 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL].filter(Boolean)
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5000'];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (process.env.NODE_ENV === 'production') {
    // In production, allow same origin (served from Express) or configured frontend URL
    if (!origin || origin === 'https://' + req.get('host') || allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin || '*');
    }
  } else {
    // In development, allow common local origins
    if (!origin || allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin || '*');
    }
  }

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'GPS Dashboard Backend'
  });
});

// API Routes
const authRoutes = require('./routes/auth.routes');
const salesRoutes = require('./routes/sales.routes');

app.use('/api/auth', authRoutes);
app.use('/api/sales', salesRoutes);

app.get('/api/info', (req, res) => {
  res.json({
    name: 'GPS Dashboard',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    features: ['authentication', 'sales', 'search', 'settings'],
    status: 'ready',
    endpoints: {
      auth: '/api/auth/login, /api/auth/register, /api/auth/logout, /api/auth/me',
      sales: '/api/sales, /api/sales/:id, /api/sales/metrics',
      health: '/api/health'
    }
  });
});

// SPA fallback — must be after all API routes
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    } else {
      // API route not found
      res.status(404).json({
        error: 'Not Found',
        path: req.path,
        method: req.method
      });
    }
  });
} else {
  // 404 Handler (development)
  app.use((req, res) => {
    res.status(404).json({
      error: 'Not Found',
      path: req.path,
      method: req.method
    });
  });
}

// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║    🚀 GPS DASHBOARD BACKEND - STARTED                  ║
╠════════════════════════════════════════════════════════╣
║  Server:     http://localhost:${PORT}                 ║
║  Environment: ${(process.env.NODE_ENV || 'development').toUpperCase().padEnd(28)}║
║  Database:   ${(process.env.SUPABASE_URL ? '✅ Configured' : '⚠️  Not configured').padEnd(28)}║
╚════════════════════════════════════════════════════════╝

📍 Ready for requests on port ${PORT}

🔗 Quick Links:
   • Health: GET /api/health
   • Info: GET /api/info

💡 Next: Implement routes
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📍 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;
