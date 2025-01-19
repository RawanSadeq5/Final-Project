const express = require("express");
const router = express.Router();
const multer = require("../config/multerConfig");
const { addBusiness } = require("../controllers/addBusinessController");

// Single route to add a new business with images and agreements
router.post(
  "/add-business",
  multer.fields([
    { name: "profileImage", maxCount: 1 }, // Single profile image
    { name: "images", maxCount: 6 }, // Up to 6 gallery images
  ]),
  addBusiness
);

module.exports = router;
//github
