require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { fullName, emailAddress, password } = req.body;
    console.log("test test..");

    // Basic validation
    if (!fullName || !emailAddress || !password) {
      console.log("We are here1");
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({
        status: false,
        message: "User already exists. Please log in instead.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      fullName,
      emailAddress,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide an email and password.",
      });
    }

    // Find user in the database
    const user = await User.findOne({ emailAddress: email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials.",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    return res.json({
      status: true,
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
