const express = require("express");
const router = express.Router();
const {
  getBusinessDetailsBook,
  //getAvailableDates,
  getAvailableTimes,
  bookAppointment,
  addToWaitingList,
} = require("../controllers/bookingController");

// Route to fetch business details
router.get("/business/:businessId/details", getBusinessDetailsBook);

// Route to fetch available dates for a specific service
//router.get("/business/:businessId/available-dates", getAvailableDates);

// Route to fetch available times for a specific date
router.get("/business/:businessId/available-times", getAvailableTimes);

// Route to book an appointment
router.post("/business/:businessId/book", bookAppointment);

// Route to add a customer to the waiting list
router.post("/business/:businessId/waiting-list", addToWaitingList);

module.exports = router;
