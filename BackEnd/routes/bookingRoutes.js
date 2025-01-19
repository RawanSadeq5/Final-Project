const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to fetch business details
router.get("/business/:id/details", getBusinessDetails);

// Route to fetch available dates for a specific service
router.get("/business/:id/available-dates", getAvailableDates);

// Route to fetch available times for a specific date
router.get("/business/:id/available-times", getAvailableTimes);

// Route to book an appointment
router.post("/business/:id/book", bookAppointment);

// Route to add a customer to the waiting list
router.post("/business/:id/waiting-list", addToWaitingList);

module.exports = router;
