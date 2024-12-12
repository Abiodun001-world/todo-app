const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Render Signup Page
exports.renderSignup = (req, res) => {
  res.render("signup", { error: null, success: null });
};

// Render Login Page
exports.renderLogin = (req, res) => {
  res.render("login", { error: null });
};

// Generate a JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// User Signup
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for missing fields
    if (!username || !password) {
      return res.render("signup", { 
        error: "Username and password are required.", 
        success: null 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render("signup", { 
        error: "Username already exists.", 
        success: null 
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Render signup page with success message
    res.render("signup", { 
      error: null, 
      success: "Account created successfully. Please log in." 
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.render("signup", { 
      error: "Error registering user.", 
      success: null 
    });
  }
};
   
// User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", { 
        error: "Invalid username or password." 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { 
        error: "Invalid username or password." 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set token in cookie
    res.cookie('token', token, { 
      httpOnly: true, 
   //   secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 
    });

    // Redirect to tasks page
    res.redirect('/tasks');
  } catch (err) {
    console.error("Error logging in user:", err);
    res.render("login", { 
      error: "An error occurred during login." 
    });
  }
};

// User Logout
exports.logout = (req, res) => {
  res.clearCookie('token'); 
  res.redirect('/auth/login');
};