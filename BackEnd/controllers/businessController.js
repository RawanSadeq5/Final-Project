const Business = require("../models/businessModel");
const Appointment = require("../models/Appointment");

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
    const { name, address, phone, openingHours } = req.body;

    const updatedBusiness = await Business.findByIdAndUpdate(
      businessId,
      { name, address, phone, openingHours },
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

    const appointments = await Appointment.find({ businessId });

    const formattedAppointments = appointments.map((appointment) => ({
      service: appointment.serviceType,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.durationInMinutes,
      price: appointment.originalPrice || appointment.discountPrice,
      customerName: appointment.customerName,
      customerPhoneNumber: appointment.customerPhone,
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
    const { serviceType, date, time, durationInMinutes, originalPrice } =
      req.body;

    const newAppointment = new Appointment({
      businessId,
      serviceType,
      date,
      time,
      durationInMinutes,
      originalPrice,
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
    const { serviceType, date, time, originalPrice, discountPrice } = req.body;

    const newHotAppointment = new Appointment({
      businessId,
      serviceType,
      date,
      time,
      originalPrice,
      discountPrice,
      isHot: true,
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

// Update business profile image
exports.updateProfileImage = async (req, res) => {
  try {
    const { businessId } = req.params;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      file.filename
    }`;
    business.profileImage = imageUrl;
    await business.save();

    res.status(200).json({ success: true, profileImage: imageUrl });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update profile image." });
  }
};

// Update business images
exports.updateBusinessImages = async (req, res) => {
  try {
    const { businessId } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded." });
    }

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    const imageUrls = files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    business.images.push(...imageUrls);
    await business.save();

    res.status(200).json({ success: true, images: business.images });
  } catch (error) {
    console.error("Error updating business images:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update business images." });
  }
};
