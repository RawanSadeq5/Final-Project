const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllHotAppointments,
  searchBusiness,
  searchArea,
  searchService,
} = require("../controllers/homeController");

// Search endpoints
router.get("/search/business", searchBusiness);
router.get("/search/area", searchArea);
router.get("/search/service", searchService);

// GET ALL HOT APPOINTMENTS
router.get("/appointments/hot", getAllHotAppointments);

module.exports = router;
