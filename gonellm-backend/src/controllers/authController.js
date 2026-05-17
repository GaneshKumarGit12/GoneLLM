import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import inMemoryUsers from "../utils/inMemoryStore.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, phone, password, confirmPassword } = req.body;

    // Validate input
    if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Phone number must be 10 digits" });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists (in-memory or MongoDB)
    if (inMemoryUsers.has(email)) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    if (inMemoryUsers.has(username)) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Try MongoDB first, fallback to in-memory
    try {
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ error: "User already exists with this email" });
        }
        if (existingUser.username === username) {
          return res.status(400).json({ error: "Username already taken" });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ 
        firstName, 
        lastName, 
        username, 
        email, 
        phone, 
        password: hashedPassword 
      });
      await user.save();
      res.json({ message: "User registered successfully" });
    } catch (dbError) {
      // MongoDB not available, use in-memory storage
      console.log("MongoDB not available, using in-memory storage");
      const hashedPassword = await bcrypt.hash(password, 10);
      inMemoryUsers.set(email, { 
        firstName, 
        lastName, 
        username, 
        email, 
        phone, 
        password: hashedPassword, 
        premium: false, 
        tokens: 3000 
      });
      res.json({ message: "User registered successfully (demo mode)" });
    }
  } catch (err) {
    console.error("Registration error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "User already exists with this email or username" });
    }
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Try MongoDB first, fallback to in-memory
    let user = null;
    let usingInMemory = false;
    try {
      user = await User.findOne({ username });
    } catch (dbError) {
      // MongoDB not available, check in-memory
      console.log("MongoDB not available, checking in-memory storage");
      // Find user by username in memory map values
      for (const [key, val] of inMemoryUsers.entries()) {
        if (val.username === username) {
          user = val;
          break;
        }
      }
      usingInMemory = true;
    }

    if (!user) {
      if (usingInMemory) {
        console.log("Auto-creating mock user for Vercel demo mode");
        const hashedPassword = await bcrypt.hash(password, 10);
        user = { username, email: `${username}@mock.com`, password: hashedPassword, premium: false, tokens: 3000 };
        inMemoryUsers.set(user.email, user);
      } else {
        return res.status(400).json({ error: "User not found" });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const secret = process.env.JWT_SECRET || "fallback_secret_for_demo_mode";
    const token = jwt.sign({ email: user.email, username: user.username }, secret, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};
