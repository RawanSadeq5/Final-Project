require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const businessRoutes = require("./routes/businessRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const homeRoutes = require("./routes/homeRoutes");
const myAppointmentsRoutes = require("./routes/myAppointmentsRoutes");
const addBusinessRoutes = require("./routes/addBusinessRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to DB
connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for image access
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", authRoutes);
app.use("/api", businessRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", homeRoutes);
app.use("/api", myAppointmentsRoutes);
app.use("/api", addBusinessRoutes);
app.use("/api", forgotPasswordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
