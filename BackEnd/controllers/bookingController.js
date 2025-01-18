// bookingController.js
const BookingService = require("../services/bookingService"); // Assuming you have a service layer for logic

// Fetch available dates for a business
exports.getAvailableDates = async (req, res) => {
  try {
    const businessId = req.params.id;
    if (!businessId) {
      return res.status(400).json({ error: "Business ID is required" });
    }

    const availableDates = await BookingService.getAvailableDates(businessId);
    res.status(200).json({ availableDates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch available dates" });
  }
};

// Fetch available times for a specific date
exports.getAvailableTimes = async (req, res) => {
  try {
    const businessId = req.params.id;
    const { date } = req.query;

    if (!businessId || !date) {
      return res
        .status(400)
        .json({ error: "Business ID and date are required" });
    }

    const availableTimes = await BookingService.getAvailableTimes(
      businessId,
      date
    );
    res.status(200).json({ availableTimes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch available times" });
  }
};

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const businessId = req.params.id;
    const { date, time, customerName, customerPhone, notes } = req.body;

    if (!businessId || !date || !time || !customerName || !customerPhone) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const bookingConfirmation = await BookingService.bookAppointment(
      businessId,
      date,
      time,
      customerName,
      customerPhone,
      notes
    );

    res.status(200).json({
      message: "Appointment booked successfully",
      bookingConfirmation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};
