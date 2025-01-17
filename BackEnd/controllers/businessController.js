const Business = require("../models/businessModel");
const Appointment = require("../models/appointment");

// Fetch business details
exports.getBusinessDetails = async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId);

    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    res.status(200).json({ success: true, business });
  } catch (error) {
    console.error("Error fetching business details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch business details." });
  }
};

// Update business details
exports.updateBusinessDetails = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { name, address, phone, openHours } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { name, address, phone, openHours },
      { new: true }
    );

    if (!updatedBusiness) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    res.status(200).json({ success: true, business: updatedBusiness });
  } catch (error) {
    console.error("Error updating business details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update business details." });
  }
};

// Get appointments for a business
exports.getAppointments = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Fetch appointments for the business
    const appointments = await Appointment.find({ businessId });

    const formattedAppointments = appointments.map((appointment) => ({
      service: appointment.service,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      price: appointment.price,
      customerName: appointment.customerName,
      customerPhoneNumber: appointment.customerPhoneNumber,
    }));

    res
      .status(200)
      .json({ success: true, appointments: formattedAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments." });
  }
};

// Add a new available appointment
exports.addAvailableAppointment = async (req, res) => {
  try {
    const { businessId } = req.params;
    const {
      service,
      date,
      time,
      duration,
      price,
      customerName,
      customerPhoneNumber,
    } = req.body;

    const newAppointment = new Appointment({
      businessId,
      service,
      date,
      time,
      duration,
      price,
      type: "available",
    });

    await newAppointment.save();

    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error("Error adding appointment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add appointment." });
  }
};

// Add a hot appointment
exports.addHotAppointment = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { service, date, time, originalPrice, discountPrice } = req.body;

    const newHotAppointment = new Appointment({
      businessId,
      service,
      date,
      time,
      originalPrice,
      discountPrice,
      type: "hot",
    });

    await newHotAppointment.save();

    res.status(201).json({ success: true, appointment: newHotAppointment });
  } catch (error) {
    console.error("Error adding hot appointment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add hot appointment." });
  }
};

// Update business images
exports.updateBusinessImage = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { imagePath } = req.body;

    const business = await Business.findById(businessId);

    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    business.images.push(imagePath);
    await business.save();

    res.status(200).json({ success: true, business });
  } catch (error) {
    console.error("Error updating business images:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update business images." });
  }
};

/*const Business = require("../models/Business");

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
};*/
