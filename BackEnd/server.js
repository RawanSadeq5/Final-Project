require("dotenv").config(); // Load environment variables
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Simple health check
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
