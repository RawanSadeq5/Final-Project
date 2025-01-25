const Business = require("../models/businessModel");

exports.addBusiness = async (req, res) => {
  try {
    const {
      fullName,
      businessName,
      email,
      password,
      phone,
      address,
      services,
      openingHours,
      advancePayment,
      cancellationDays,
      reward,
    } = req.body;

    const parsedOpeningHours = JSON.parse(openingHours || "[]");

    // Filter out days with `null` or missing `open` and `close` times
    const formattedOpeningHours = [];
    for (const [day, hours] of Object.entries(parsedOpeningHours)) {
      if (hours && hours.open && hours.close) {
        formattedOpeningHours[day] = hours;
      }
    }

    const parsedServices = JSON.parse(services || "[]");

    const profileImageFile = req.files?.profileImage?.[0];
    const galleryFiles = req.files?.images || [];

    const profileImageUrl = profileImageFile
      ? `${req.protocol}://${req.get("host")}/uploads/${
          profileImageFile.filename
        }`
      : null;

    const galleryUrls = galleryFiles.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const newBusiness = new Business({
      fullName,
      BusinessName: businessName,
      businessEmail: email,
      businessPassword: password,
      phoneNumber: phone,
      address,
      services: parsedServices,
      openingHours: formattedOpeningHours,
      profileImage: profileImageUrl,
      images: galleryUrls,
      agreements: {
        advancePayment,
        cancellationDays,
        customerReward: reward,
      },
    });

    await newBusiness.save();

    res.status(201).json({
      success: true,
      message: "Business added successfully.",
      business: newBusiness._id,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the business.",
    });
    // Return validation errors
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    // General error handler
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the business.",
    });
  }
};
