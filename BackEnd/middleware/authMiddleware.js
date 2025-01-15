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

    // Attach userId to the request for further usage if needed
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT validation error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
