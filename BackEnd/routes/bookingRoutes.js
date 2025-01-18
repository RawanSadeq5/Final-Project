// bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to fetch available dates for a business
router.get(
  "/business/:id/available-dates",
  bookingController.getAvailableDates
);

// Route to fetch available times for a specific date
router.get(
  "/business/:id/available-times",
  bookingController.getAvailableTimes
);

// Route to book an appointment
router.post("/business/:id/book", bookingController.bookAppointment);

module.exports = router;
