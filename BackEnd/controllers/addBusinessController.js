const Business = require("../models/businessModel");

// Add a new business
exports.addBusiness = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      services,
      openingHours,
      profileImage,
      images,
    } = req.body;

    // Create a new business instance
    const newBusiness = new Business({
      name,
      email,
      phone,
      address,
      services,
      openingHours,
      profileImage,
      images,
    });

    await newBusiness.save();

    res.status(201).json({ success: true, business: newBusiness });
  } catch (error) {
    console.error("Error adding business:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add business." });
  }
};

// Upload business images
exports.uploadBusinessImages = async (req, res) => {
  try {
    const { businessId, images } = req.body;

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    business.images.push(...images);
    await business.save();

    res.status(200).json({ success: true, business });
  } catch (error) {
    console.error("Error uploading business images:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to upload images." });
  }
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    const { businessId, profileImage } = req.body;

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    business.profileImage = profileImage;
    await business.save();

    res.status(200).json({ success: true, business });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to upload profile image." });
  }
};

//agreements
exports.addAgreements = async (req, res) => {
  try {
    const {
      businessId,
      advancePayment,
      cancellationDays,
      customerReward,
      hotDiscount,
    } = req.body;

    // Validate input
    if (
      !businessId ||
      typeof advancePayment === "undefined" ||
      !cancellationDays ||
      !customerReward ||
      !hotDiscount
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Find the business by ID
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found.",
      });
    }

    // Update the agreements data
    business.agreements = {
      advancePayment,
      cancellationDays,
      customerReward,
    };

    await business.save();

    res.status(200).json({
      success: true,
      message: "Business agreements updated successfully.",
      agreements: business.agreements,
    });
  } catch (error) {
    console.error("Error updating agreements:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
