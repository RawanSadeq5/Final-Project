const express = require("express");
const router = express.Router();
const { getAdvancePayment } = require("../controllers/paymentController");

// Route to get advance payment by business ID
router.get("/payment/:businessId/advance-payment", getAdvancePayment);

module.exports = router;
