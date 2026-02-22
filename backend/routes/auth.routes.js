/**
 * Authentication Routes
 * POST /api/auth/login
 * POST /api/auth/register
 * POST /api/auth/logout
 * GET /api/auth/me
 */

const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post('/login', authController.login);

/**
 * POST /api/auth/register
 * Register new user
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/logout
 * Logout (client-side)
 */
router.post('/logout', verifyToken, authController.logout);

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', verifyToken, authController.me);

module.exports = router;
