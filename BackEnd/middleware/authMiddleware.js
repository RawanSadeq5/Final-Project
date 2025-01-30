/**
 * Authentication Middleware
 * This middleware validates JSON Web Tokens (JWT) to authenticate users.
 * It extracts the token from the `Authorization` header, verifies its validity,
 * and attaches the decoded user ID to the request object for further processing.
 * - Checks if the `Authorization` header is present.
 * - Extracts and verifies the JWT using a secret key from the environment variables.
 * - Attaches the decoded `userId` to `req.userId` for route handlers to access.
 * - Returns a 401 Unauthorized response if the token is missing or invalid.
 **/

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const secretKey = process.env.JWT_SECRET || "secretKey";
    const decoded = jwt.verify(token, secretKey);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT validation error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
