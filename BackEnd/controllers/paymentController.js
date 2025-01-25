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

    // Extract advance payment amount
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
