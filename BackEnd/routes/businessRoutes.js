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

// Update profile image
router.post(
  "/business/:businessId/profile-image",
  multer.single("profileImage"),
  updateProfileImage
);

module.exports = router;
