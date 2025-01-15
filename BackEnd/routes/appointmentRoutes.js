const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createAppointment,
  getAllHotAppointments,
  getAvailableHours,
  getAllAppointments,
} = require("../controllers/appointmentController");

// CREATE APPOINTMENT
router.post("/appointments", authMiddleware, createAppointment);

// GET ALL HOT APPOINTMENTS
router.get("/appointments/hot", authMiddleware, getAllHotAppointments);

//Get ALL Normal Appointments
router.get("/appointments", authMiddleware, getAllAppointments);

// GET AVAILABLE HOURS
router.get("/appointments/availableHours", authMiddleware, getAvailableHours);

module.exports = router;
