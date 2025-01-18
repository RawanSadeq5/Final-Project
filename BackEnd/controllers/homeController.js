//const Appointment = require("../models/Appointment");
const Business = require("../models/businessModel");

// Search for businesses
exports.searchBusiness = async (req, res) => {
  try {
    const query = req.query.name || "";
    const businesses = await Business.find({
      name: { $regex: query, $options: "i" },
    }).select("name address _id");
    res.json({ success: true, businesses });
  } catch (error) {
    console.error("Error searching businesses:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Search for areas
exports.searchArea = async (req, res) => {
  try {
    const query = req.query.name || "";
    const areas = await Business.find({
      area: { $regex: query, $options: "i" },
    })
      .distinct("area")
      .select("name address _id");
    res.json({ success: true, areas });
  } catch (error) {
    console.error("Error searching areas:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Search for services
exports.searchService = async (req, res) => {
  try {
    const query = req.query.type || "";
    const services = await Business.find({
      serviceType: { $regex: query, $options: "i" },
    }).select("name address _id");
    res.json({ success: true, services });
  } catch (error) {
    console.error("Error searching services:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET ALL HOT APPOINTMENTS
 */
exports.getAllHotAppointments = async (req, res) => {
  try {
    const hotAppointments = await Appointment.find({ isHot: true });
    return res.json({ success: true, hotAppointments });
  } catch (error) {
    console.error("Error fetching hot appointments:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};
