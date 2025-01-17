const express = require("express");
const router = express.Router();
const {
  addBusiness,
  uploadBusinessImages,
  uploadProfileImage,
} = require("../controllers/addBusinessController");

// Route to add a new business
router.post("/add-business", addBusiness);

// Route to upload business images
router.post("/add-business/images", uploadBusinessImages);

// Route to upload profile image
router.post("/add-business/profile-image", uploadProfileImage);

// Route to add or update agreements
router.post("/add-agreements", addAgreements);

module.exports = router;
