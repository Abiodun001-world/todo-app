const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Render Signup Page
exports.renderSignup = (req, res) => {
  res.render("signup");
};

// Render Login Page
exports.renderLogin = (req, res) => {
  res.render("login");
};

// Generate a JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" }); // Token valid for 1 day
};

// User Signup
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for missing fields
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Error registering user." });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for missing fields
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

// Generate token
const token = generateToken(user._id);

res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
console.error("Error logging in user:", err);
res.status(500).json({ error: "Error logging in user." });
  }
};

// User Logout
exports.logout = (req, res) => {
  res.clearCookie('token'); 
  res.status(200).json({ message: "Logout successfully." });
};
