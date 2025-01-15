require("dotenv").config();
const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/my_database";
    console.log(mongoURI);
    await mongoose.connect(mongoURI, {});
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };
