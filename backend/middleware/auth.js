/**
 * Authentication Middleware
 * JWT Token Verification
 */

const config = require('../config');

/**
 * Verify JWT Token
 */
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: 'No authorization token provided',
        code: 'NO_TOKEN'
      });
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer') {
      return res.status(401).json({
        error: 'Invalid authorization scheme',
        code: 'INVALID_SCHEME'
      });
    }

    // TODO: Verify with Supabase or JWT library
    // For now, just parse the token
    try {
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }

  } catch (error) {
    return res.status(401).json({
      error: 'Authentication failed',
      code: 'AUTH_ERROR'
    });
  }
};

/**
 * Check if user is admin
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Admin access required',
      code: 'FORBIDDEN'
    });
  }

  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
