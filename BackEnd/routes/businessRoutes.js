const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createBusiness,
  getAllBusinesses,
} = require("../controllers/businessController");
const authMiddleware = require("../middleware/authMiddleware");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store images
  },
  filename: (req, file, cb) => {
    // Example business-1638452393921.png
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `business-${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// CREATE A BUSINESS
router.post(
  "/businesses",
  authMiddleware,
  upload.array("images"),
  createBusiness
);

// GET ALL BUSINESSES Names and IDS
router.get("/businesses", authMiddleware, getAllBusinesses);

module.exports = router;
