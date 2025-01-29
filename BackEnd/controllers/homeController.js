const { appointment } = require("../models/Appointment");
const Business = require("../models/businessModel");

// Search for businesses
/*exports.searchBusiness = async (req, res) => {
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
};*/

exports.searchBusinesses = async (req, res) => {
  try {
    const { name, service, area } = req.query;

    // Build search criteria dynamically
    let searchCriteria = {};

    if (name) {
      searchCriteria.BusinessName = { $regex: name, $options: "i" };
    }
    if (service) {
      searchCriteria["services.name"] = { $regex: service, $options: "i" };
    }
    if (area) {
      searchCriteria.address = { $regex: area, $options: "i" };
    }

    const businesses = await Business.find(searchCriteria).select(
      "BusinessName address _id"
    );

    if (!businesses.length) {
      return res.json({ success: false, message: "No businesses found." });
    }

    res.json({ success: true, businesses });
  } catch (error) {
    console.error("Error searching businesses:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * GET ALL HOT APPOINTMENTS
 */
/*exports.getAllHotAppointments = async (req, res) => {
  try {
    const hotAppointments = await appointment.find({ isHot: true });
    return res.json({ success: true, hotAppointments });
  } catch (error) {
    console.error("Error fetching hot appointments:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};*/

exports.getAllHotAppointments = async (req, res) => {
  try {
    const hotAppointments = await appointment
      .find({ isHot: true })
      .populate("businessId", "BusinessName address"); // Fetch business details

    if (!hotAppointments.length) {
      return res.json({
        success: false,
        message: "No hot appointments found.",
      });
    }

    const formattedAppointments = hotAppointments.map((app) => ({
      businessId: app.businessId._id,
      BusinessName: app.businessId.BusinessName,
      Address: app.businessId.address,
      ServiceType: app.serviceType,
      originalPrice: app.originalPrice,
      discountPrice: app.discountPrice,
      Date: app.date,
      Time: app.time,
    }));

    res.json({ success: true, hotAppointments: formattedAppointments });
  } catch (error) {
    console.error("Error fetching hot appointments:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
