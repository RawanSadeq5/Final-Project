const express = require("express");
const router = express.Router();

const { forgotPassword } = require("../controllers/forgotPasswordController");

// POST /api/forgotPassword
router.post("/forgotPassword", forgotPassword);

module.exports = router;
