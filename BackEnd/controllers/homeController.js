/**
 * Home Controller
 * This module provides functionalities to:
 * 1) **Search Businesses (`searchBusinesses` function)**:
 *    - Allows users to search for businesses based on:
 *      - Business name (`name` query parameter, case-insensitive).
 *      - Service type (`service` query parameter, case-insensitive).
 *      - Location/area (`area` query parameter, case-insensitive).
 *    - Returns a list of matching businesses with their names and addresses.
 *
 * 2) **Retrieve Hot Appointments (`getAllHotAppointments` function)**:
 *    - Fetches all available hot appointments (discounted appointments).
 *    - Populates business details (`BusinessName` and `Address`).
 *    - Returns a formatted list of appointments including:
 *      - Business name, address, service type, original price, discount price, date, and time.
 *
 * Error Handling:
 * - `404 Not Found`: If no matching businesses or hot appointments exist.
 * - `500 Internal Server Error`: If unexpected issues occur.
 * - Logs errors for debugging purposes.
 **/

const { appointment } = require("../models/Appointment");
const Business = require("../models/businessModel");

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
