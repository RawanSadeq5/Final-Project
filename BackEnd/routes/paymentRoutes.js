const express = require("express");
const router = express.Router();
const { getAdvancePayment } = require("../controllers/paymentController");

// Route to get advance payment by business ID
router.get("/advance-payment/:businessId", getAdvancePayment);

module.exports = router;
