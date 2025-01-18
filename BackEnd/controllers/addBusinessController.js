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

// In your addBusinessController.js

// Upload business images
exports.uploadBusinessImages = async (req, res) => {
  try {
    // When using upload.array("images"):
    // req.files is an array of file objects
    // Each file object has properties like 'filename', 'path', etc.

    // e.g. from the client, you might also receive something like:
    // POST /api/add-business/images
    // Form data: businessId=... & images=[the actual files]

    const businessId = req.body.businessId;
    const files = req.files; // Array of uploaded files

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    // Construct URLs for each file
    const imagePaths = files.map((file) => {
      // Example of the final path:
      // "http://localhost:3000/uploads/image-1681327123456.png"
      return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    });

    // Save these URLs in DB
    business.images.push(...imagePaths);
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
    const businessId = req.body.businessId;
    const file = req.file; // single file

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    // Build the URL for the uploaded image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      file.filename
    }`;

    business.profileImage = imageUrl;
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
