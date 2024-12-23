const jwt = require("jsonwebtoken");
const users = require("../db/fakeDB");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, age, gender, email, password } = req.body;

  // Check if user with this email already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Create new user object
  const newUser = new User({ fullName, age, gender, email, password });
  users.push(newUser);

  // Return success response
  return res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      age: newUser.age,
      gender: newUser.gender,
      email: newUser.email,
    },
  });
};

exports.login = (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Find the user by email
  const existingUser = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { userId: existingUser.id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // Token valid for 24 hours
  );

  return res.status(200).json({
    message: "Login successful",
    token: token,
  });
};
