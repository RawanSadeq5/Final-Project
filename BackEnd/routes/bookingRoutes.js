const express = require("express");
const router = express.Router();
const {
  getBusinessDetailsBook,
  getAvailableTimes,
  bookAppointment,
  addToWaitingList,
  getBusinessServiceAvailableDates,
  getBusinessServiceAvailableTimes,
} = require("../controllers/bookingController");

// Route to fetch business details
router.get("/business/:businessId/details", getBusinessDetailsBook);

router.get(
  "/business/serviceDates/:businessId/:serviceName",
  getBusinessServiceAvailableDates
);

router.get(
  "/business/serviceTimes/:businessId/:serviceName/:date",
  getBusinessServiceAvailableTimes
);

router.get("/business/:businessId/available-times", getAvailableTimes);

router.post("/business/:businessId/waiting-list", addToWaitingList);

router.post("/business/book/:appointmentId", bookAppointment);

module.exports = router;
