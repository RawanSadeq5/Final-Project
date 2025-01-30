/**
 * Advance Payment Controller
 * This module provides an endpoint to retrieve the advance payment amount set by a business.
 *
 * 1) **Get Advance Payment (`getAdvancePayment` function)**:
 *    - Fetches the `businessId` from request parameters.
 *    - Queries the database for the business and retrieves its advance payment amount.
 *    - Returns the advance payment amount in the response.
 *
 * Error Handling:
 * - Returns appropriate HTTP status codes:
 *   - `404 Not Found`: If the business does not exist.
 *   - `500 Internal Server Error`: In case of unexpected issues.
 * - Logs errors for debugging purposes.
 **/

const Business = require("../models/businessModel");

// Controller to get advance payment by business ID
exports.getAdvancePayment = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Fetch business data from the database
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }
    const advancePayment = business.agreements.advancePayment;

    res.status(200).json({
      success: true,
      advancePayment,
    });
  } catch (error) {
    console.error("Error retrieving advance payment:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the advance payment.",
    });
  }
};
