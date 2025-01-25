const express = require("express");
const router = express.Router();
const multer = require("../config/multerConfig");

const {
  getBusinessDetails,
  updateBusinessDetails,
  getAppointments,
  addAvailableAppointment,
  addHotAppointment,
  updateProfileImage,
  updateBusinessImages,
} = require("../controllers/businessController");

// Fetch business details
router.get("/api/business/:businessId", getBusinessDetails);

// Update business details
router.put("/api/business/:businessId", updateBusinessDetails);

// Get business appointments
router.get("/api/business/:businessId/appointments", getAppointments);

// Add a new available appointment
router.post("/:businessId/appointments", addAvailableAppointment);

// Add a hot appointment
router.post("/:businessId/hot-appointments", addHotAppointment);

// Update profile image
router.post(
  "/api/business/:businessId/profile-image",
  multer.single("profileImage"),
  updateProfileImage
);

// Update business images
router.post(
  "/:businessId/images",
  multer.array("images", 6),
  updateBusinessImages
);

module.exports = router;
