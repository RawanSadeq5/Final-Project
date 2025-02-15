/**
 * Add Business Controller
 * This module handles the creation of a new business entity in the system.
 * It receives business details from the client, processes the request,
 * and stores the information in the database.
 *
 * Functionality:
 * 1) Extracts business details from `req.body`, including:
 *    - Business owner details (full name, email, password, phone).
 *    - Business-specific details (name, address, services, operating hours).
 *    - Payment agreements (advance payment, cancellation policy, customer rewards).
 * 2) Parses and validates `services` and `openingHours` to ensure correct formatting.
 * 3) Handles file uploads for profile images and business gallery.
 * 4) Saves the new business entity to MongoDB.
 * 5) Returns a response containing essential business details or error
 * Error Handling:
 * - Validates required fields and returns appropriate status codes.
 * - Handles file upload errors and database validation errors.
 * - Ensures proper error messaging for debugging and client-side processing.
 **/

const Business = require("../models/businessModel");

exports.addBusiness = async (req, res) => {
  try {
    console.log(req.body);
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
      business: {
        _id: newBusiness._id,
        profileImage: newBusiness.profileImage,
        images: newBusiness.images,
        services: newBusiness.services,
        openingHours: newBusiness.openingHours,
        agreements: newBusiness.agreements,
        BusinessName: newBusiness.BusinessName,
        address: newBusiness.address,
        phoneNumber: newBusiness.phoneNumber,
      },
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
