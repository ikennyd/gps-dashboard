/**
 * Authentication Controller
 * Handle login, register, logout
 */

/**
 * User Login
 * @route POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password required',
        code: 'MISSING_FIELDS'
      });
    }

    // TODO: Implement Supabase authentication
    // For now, return mock token
    const mockToken = Buffer.from(JSON.stringify({
      id: '123',
      email: email,
      role: 'user',
      iat: Math.floor(Date.now() / 1000)
    })).toString('base64');

    res.json({
      success: true,
      token: `mock.${mockToken}.signature`,
      user: {
        id: '123',
        email: email,
        name: 'User',
        role: 'user'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: error.message
    });
  }
};

/**
 * User Register
 * @route POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, password, and name required',
        code: 'MISSING_FIELDS'
      });
    }

    // TODO: Implement Supabase registration

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: '123',
        email: email,
        name: name,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: error.message
    });
  }
};

/**
 * User Logout
 * @route POST /api/auth/logout
 */
const logout = (req, res) => {
  // JWT doesn't require server-side logout
  // Client will remove token from localStorage
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

/**
 * Get Current User
 * @route GET /api/auth/me
 */
const me = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.json({
    user: req.user
  });
};

module.exports = {
  login,
  register,
  logout,
  me
};
