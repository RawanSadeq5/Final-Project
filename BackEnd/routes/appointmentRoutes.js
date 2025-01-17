const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createAppointment,
  getAvailableHours,
  getAllAppointments,
} = require("../controllers/appointmentController");

// CREATE APPOINTMENT
router.post("/appointments", authMiddleware, createAppointment);

//Get ALL Normal Appointments
router.get("/appointments", authMiddleware, getAllAppointments);

// GET AVAILABLE HOURS
router.get("/appointments/availableHours", authMiddleware, getAvailableHours);

module.exports = router;
