const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

// Validation rules
const signupValidation = [
  body("fullName").notEmpty().withMessage("Full Name is required"),
  body("age").notEmpty().withMessage("Age is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Routes
router.post("/signup", signupValidation, authController.signup);
router.post("/login", loginValidation, authController.login);

module.exports = router;
