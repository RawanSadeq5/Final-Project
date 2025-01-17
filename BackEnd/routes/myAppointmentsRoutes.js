const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getUserAppointments,
  getUserWaitingList,
  cancelAppointment,
  deleteFromWaitingList,
} = require("../controllers/myAppointmentsController");

// Get all user appointments
router.get("/appointments", authMiddleware, getUserAppointments);

// Get user's waiting list
router.get("/appointments/waiting-list", authMiddleware, getUserWaitingList);

// Cancel an appointment
router.delete(
  "/appointments/:appointmentId",
  authMiddleware,
  cancelAppointment
);

// Delete from the waiting list
router.delete(
  "/appointments/waiting-list/:waitingId",
  authMiddleware,
  deleteFromWaitingList
);

module.exports = router;
