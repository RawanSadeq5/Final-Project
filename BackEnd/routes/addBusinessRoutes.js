// addBusinessRoutes.js
const express = require("express");
const router = express.Router();
const {
  addBusiness,
  uploadBusinessImages,
  uploadProfileImage,
  addAgreements,
} = require("../controllers/addBusinessController");

// *** import your multer config here
const upload = require("../config/multerConfig");

// Route to add a new business
router.post("/add-business", addBusiness);

// Route to upload multiple business images (if you allow multiple images at once)
router.post(
  "/add-business/images",
  upload.array("images", 6), // 'images' must match the form field name, can allow up to 6
  uploadBusinessImages
);

// Route to upload single profile image
router.post(
  "/add-business/profile-image",
  upload.single("profileImage"), // 'profileImage' must match the form field name
  uploadProfileImage
);

// Route to add or update agreements
router.post("/add-agreements", addAgreements);

module.exports = router;
