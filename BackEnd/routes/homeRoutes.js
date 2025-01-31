const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllHotAppointments,
  searchBusinesses,
  bookHotAppointments,
} = require("../controllers/homeController");

// Search endpoints
router.get("/search", searchBusinesses);

// GET ALL HOT APPOINTMENTS
router.get("/appointments/hot", getAllHotAppointments);

router.post("/appointments/hot/:appointmentId", bookHotAppointments);

module.exports = router;
