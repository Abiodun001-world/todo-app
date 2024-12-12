const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // Check for token in cookies instead of headers
    const token = req.cookies.token;

    // If no token, redirect to login
    if (!token) {
      return res.redirect('/auth/login');
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and attach to request
    const user = await User.findById(decoded.id);

    // If no user found, redirect to login
    if (!user) {
      return res.redirect('/auth/login');
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    // Clear invalid token
    res.clearCookie('token');
    
    // Redirect to login page
    res.redirect('/auth/login');
  }
};