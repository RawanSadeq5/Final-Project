const express = require("express");
const router = express.Router();
//const multer = require("multer");

const {
  getBusinessDetails,
  updateBusinessDetails,
  getAppointments,
  addAvailableAppointment,
  addHotAppointment,
  updateBusinessImage,
} = require("../controllers/businessController");

// Fetch business details
router.get("/business/:businessId", getBusinessDetails);

// Update business details
router.put("/business/:businessId", updateBusinessDetails);

// Get business appointments
router.get("/business/:businessId/appointments", getAppointments);

// Add a new available appointment
router.post("/business/:businessId/appointments", addAvailableAppointment);

// Add a hot appointment
router.post("/business/:businessId/hot-appointments", addHotAppointment);

// Update business images
router.post("/business/:businessId/images", updateBusinessImage);

module.exports = router;

/*const {
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

module.exports = router;*/
