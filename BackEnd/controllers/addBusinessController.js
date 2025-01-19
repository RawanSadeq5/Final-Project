const Business = require("../models/businessModel");

// Add a new business with profile image, gallery images, and agreements
exports.addBusiness = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      services,
      openingHours,
      advancePayment,
      cancellationDays,
      customerReward,
    } = req.body;

    // Handle file uploads
    const profileImageFile = req.files?.profileImage?.[0]; // Single file for profile image
    const galleryFiles = req.files?.images || []; // Array of gallery images

    // Construct URLs for uploaded files
    const profileImageUrl = profileImageFile
      ? `${req.protocol}://${req.get("host")}/uploads/${
          profileImageFile.filename
        }`
      : null;

    const galleryUrls = galleryFiles.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    // Create a new business instance
    const newBusiness = new Business({
      name,
      email,
      phone,
      address,
      services: JSON.parse(services), // Assuming services is sent as a JSON string
      openingHours: JSON.parse(openingHours), // Assuming openingHours is sent as a JSON string
      profileImage: profileImageUrl,
      images: galleryUrls,
      agreements: {
        advancePayment,
        cancellationDays,
        customerReward,
      },
    });

    // Save the business to the database
    await newBusiness.save();

    res.status(201).json({
      success: true,
      message: "Business added successfully.",
      business: newBusiness,
    });
  } catch (error) {
    console.error("Error adding business:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add business.",
    });
  }
};
