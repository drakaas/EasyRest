const jwt = require("jsonwebtoken");
const User = require('../models/user-model');

// Middleware to check if user is logged in
const isLoggedIn = async (req, res, next) => {
  try {
    // Check for token in authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Check for token in cookies as fallback
      if (!req.cookies.authToken) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      req.token = req.cookies.authToken;
    } else {
      // Extract token from header
      req.token = authHeader.split(' ')[1];
    }
    
    // Verify token
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET || 'your_jwt_secret');
    
    // Find user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check if user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // User should be attached by the isLoggedIn middleware
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Check if user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { isLoggedIn, isAdmin };
