const Business = require("../models/Business");

// CREATE BUSINESS
exports.createBusiness = async (req, res) => {
  try {
    // Hanan and Rawan IF you arew uploading images, they would be stored in req.files
    // or req.file depending on your Multer configuration
    const { name, address, phoneNumber, openingHours, services } = req.body;

    // Convert services/openingHours from JSON strings if necessary
    const parsedOpeningHours = JSON.parse(openingHours); // { sunday: { open, close }, ... }
    const parsedServices = JSON.parse(services); // [ { name, duration }, ... ]

    // Process uploaded images (if any)
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push(file.path); // e.g. "uploads/business1-img1.jpg"
      });
    }

    const newBusiness = new Business({
      name,
      address,
      phoneNumber,
      openingHours: parsedOpeningHours,
      services: parsedServices,
      images,
    });

    await newBusiness.save();
    return res.status(201).json({ success: true, business: newBusiness });
  } catch (error) {
    console.error("Error creating business:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// GET ALL BUSINESSES names and IDS

exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({}).select("name _id");
    return res.json({ success: true, businesses });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
