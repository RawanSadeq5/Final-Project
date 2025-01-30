/**
 * User Authentication Controller
 * This module handles user authentication, including user signup and login.
 *
 * 1) **Signup (`signup` function)**:
 *    - Receives user details (full name, email, password) from `req.body`.
 *    - Validates required fields and checks if the email is already registered.
 *    - Hashes the password using bcrypt for security.
 *    - Saves the new user to MongoDB.
 *    - Returns a success message or an error if signup fails.
 *
 * 2) **Login (`login` function)**:
 *    - Validates email and password inputs.
 *    - Checks if the user exists in the database.
 *    - Compares the provided password with the stored hashed password.
 *    - Generates a JWT token for authenticated sessions.
 *    - Determines user type (`businessOwner` or `regularUser`) and returns it.
 *
 * Error Handling:
 * - Provides appropriate status codes and descriptive error messages.
 * - Handles missing fields, incorrect credentials, and database issues.
 * - Ensures security by hashing passwords and using JWT for authentication.
 **/

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

    // Check if the user exists in the database
    const user = await User.findOne({ emailAddress: email });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "המשתמש לא קיים במערכת!",
      });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "אחד או יותר מהנתונים שהזנת אינם נכונים, אנא נסה שוב!",
      });
    }

    // Generate a JWT for authentication
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    // Determine user type
    const userType = user.isBusinessOwner ? "businessOwner" : "regularUser";

    return res.status(200).json({
      status: true,
      message: "Login successful!",
      token,
      userType,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
