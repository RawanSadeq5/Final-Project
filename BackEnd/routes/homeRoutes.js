const express = require("express");
const router = express.Router();

const {
  getAllHotAppointments,
  searchBusinesses,
} = require("../controllers/homeController");

// Search endpoints
router.get("/search", searchBusinesses);

// GET ALL HOT APPOINTMENTS
router.get("/appointments/hot", getAllHotAppointments);

module.exports = router;
