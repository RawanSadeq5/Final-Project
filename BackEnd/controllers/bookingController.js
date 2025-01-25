const Business = require("../models/businessModel");
const { Appointment, WaitingList } = require("../models/Appointment");

// Fetch business details
exports.getBusinessDetailsBook = async (req, res) => {
  try {
    const businessId = req.params.id;
    const business = await Business.findById(businessId).select(
      "profileImage name address phoneNumber images services"
    );

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.status(200).json(business);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch business details" });
  }
};

// Fetch available dates for a specific service
exports.getAvailableDates = async (req, res) => {
  try {
    const businessId = req.params.id;
    const { serviceId } = req.query;

    if (!serviceId) {
      return res.status(400).json({ error: "Service ID is required" });
    }

    const business = await Business.findById(businessId).select("services");
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const service = business.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Find appointments for the given service
    const appointments = await Appointment.find({
      businessId,
      serviceId,
    }).select("date");

    const bookedDates = appointments.map(
      (appointment) => appointment.date.toISOString().split("T")[0]
    );

    const availableDates = service.availableDates.filter(
      (date) => !bookedDates.includes(date)
    );

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
    const { date, serviceId } = req.query;

    if (!date || !serviceId) {
      return res
        .status(400)
        .json({ error: "Date and Service ID are required" });
    }

    // Fetch appointments for the given date and service
    const appointments = await Appointment.find({
      businessId,
      serviceId,
      date,
    }).select("time");

    //const bookedTimes = appointments.map((appointment) => appointment.time);

    // Example: You may replace this with service's available times logic
    /*const allTimes = ["09:00", "10:00", "11:30", "14:00", "16:00"]; // Example all times
    const availableTimes = allTimes.filter(
      (time) => !bookedTimes.includes(time)
    );*/

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
    const { serviceId, date, time, customerName, customerPhone, notes } =
      req.body;

    if (!serviceId || !date || !time || !customerName || !customerPhone) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const business = await Business.findById(businessId).select(
      "name address services"
    );
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const service = business.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const newAppointment = new Appointment({
      businessId,
      serviceId,
      date,
      time,
      customerName,
      customerPhone,
      notes,
      serviceName: service.name,
      servicePrice: service.price,
      duration: service.duration,
    });

    await newAppointment.save();

    res.status(200).json({
      message: "Appointment booked successfully",
      bookingDetails: {
        businessName: business.name,
        businessAddress: business.address,
        serviceName: service.name,
        servicePrice: service.price,
        date,
        time,
        duration: service.duration,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

// Add to waiting list
exports.addToWaitingList = async (req, res) => {
  try {
    const businessId = req.params.id;
    const { serviceId, date, time, fullName, phoneNumber, notes } = req.body;

    if (!serviceId || !date || !time || !fullName || !phoneNumber) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    const business = await Business.findById(businessId).select(
      "name address services"
    );
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const service = business.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const newWaitingListEntry = new WaitingList({
      businessId,
      serviceId,
      date,
      time,
      fullName,
      phoneNumber,
      notes,
    });

    await newWaitingListEntry.save();

    res.status(200).json({
      message: "Added to waiting list successfully",
      waitingListDetails: {
        businessName: business.name,
        businessAddress: business.address,
        serviceName: service.name,
        date,
        time,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add to waiting list" });
  }
};
