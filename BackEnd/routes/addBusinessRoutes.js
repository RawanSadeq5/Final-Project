const express = require("express");
const router = express.Router();
const multer = require("../config/multerConfig");
const { addBusiness } = require("../controllers/addBusinessController");

// Define file upload fields
const uploadFields = [{ name: "profileImage", maxCount: 1 }];

// Use multer upload middleware in the route
router.post("/add-business", multer.fields(uploadFields), addBusiness);

module.exports = router;
