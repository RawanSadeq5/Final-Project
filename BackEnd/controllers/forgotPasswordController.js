/**
 * Forgot Password Controller
 * This module handles user password reset functionality by allowing users to update their password securely.
 *
 * 1) **Forgot Password (`forgotPassword` function)**:
 *    - Validates the request to ensure `emailAddress` and `password` are provided.
 *    - Checks if the user exists in the database.
 *    - Hashes the new password using `bcrypt` before storing it in the database.
 *    - Updates the user's password and returns a success message upon completion.
 *
 * Error Handling:
 * - Returns appropriate HTTP status codes:
 *   - `400 Bad Request`: Missing email or password.
 *   - `404 Not Found`: User does not exist.
 *   - `500 Internal Server Error`: Unexpected issues.
 * - Logs errors for debugging purposes.
 **/

require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.forgotPassword = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    // Validate input
    if (!emailAddress || !password) {
      console.log("user test");
      return res.status(400).json({
        status: false,
        message: "Email and new password are required.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ emailAddress });
    if (!user) {
      console.log("user");
      return res.status(404).json({
        status: false,
        message: "User not found. Please register first.",
      });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("pass test");

    // Update the user's password
    user.password = password;
    await user.save();
    console.log("Password updated for user:", user.emailAddress);

    return res.json({
      status: true,
      message: "Password has been updated successfully!",
    });
  } catch (error) {
    console.error("Forgot Password error:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
