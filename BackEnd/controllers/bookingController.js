const Business = require("../models/businessModel");
const {
  appointment,
  WaitingList,
  UserAppointment,
} = require("../models/Appointment");

exports.getBusinessServiceAvailableTimes = async (req, res) => {
  try {
    const { businessId, serviceName, date } = req.params;

    // Validate business
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    // Check if the service exists
    const serviceExists = business.services.some(
      (service) => service.name.toLowerCase() === serviceName.toLowerCase()
    );
    if (!serviceExists) {
      return res
        .status(404)
        .json({ error: "Service not found for this business" });
    }

    // Optionally validate date format (e.g., "YYYY-MM-DD"), but not mandatory
    // if your system handles any valid date string
    const jsDate = new Date(date);
    if (isNaN(jsDate)) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    // Fetch all DISTINCT times for the given date, business, and service
    const appointments = await appointment.find({
      businessId,
      serviceType: serviceName,
      date,
    });

    // Map each doc to an object containing _id and time
    const availableAppointments = appointments.map((appt) => ({
      _id: appt._id,
      time: appt.time,
    }));

    return res.status(200).json({ availableAppointments });
  } catch (error) {
    console.error("Error getting available times:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getBusinessServiceAvailableDates = async (req, res) => {
  try {
    const { businessId, serviceName } = req.params;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const serviceExists = business.services.some(
      (service) => service.name.toLowerCase() === serviceName.toLowerCase()
    );
    if (!serviceExists) {
      return res
        .status(404)
        .json({ error: "Service not found for this business" });
    }

    const availableDates = await appointment.distinct("date", {
      businessId,
      serviceType: serviceName,
    });

    return res.status(200).json({ availableDates });
  } catch (error) {
    console.error("Error getting available dates:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Fetch business details
exports.getBusinessDetailsBook = async (req, res) => {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId);

    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found." });
    }

    res.status(200).json({
      success: true,
      business: {
        _id: business._id,
        profileImage: business.profileImage,
        services: business.services,
        BusinessName: business.BusinessName,
        address: business.address,
        phoneNumber: business.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching business details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch business details." });
  }
};

// Fetch available dates for a specific service
/*exports.getAvailableDates = async (req, res) => {
  console.log("get available dates:", req, res);
  try {
    const businessId = req.params.id;

    const { serviceId } = "6797732d84601359ea4579c4";

    console.log("business id ", serviceId);

    if (!serviceId) {
      return res.status(400).json({ error: "Service ID is required" });
    }

    const business = await Business.findById(businessId).select("services");
    console.log("busniess we got from id ", business);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }
    console.log("the service id ", serviceId);
    const service = business.services.id(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Find appointments for the given service
    const appointments = await appointment
      .find({
        businessId,
        serviceId,
      })
      .select("date");
    console.log("appointments ", appointments);
    const bookedDates = appointments.map(
      (appointment) => appointment.date.toISOString().split("T")[0]
    );

    console.log("booked dates ", bookedDates);
    const availableDates = service.availableDates.filter(
      (date) => !bookedDates.includes(date)
    );
    console.log("available dates ", availableDates);
    res.status(200).json({ availableDates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch available dates" });
  }
};*/

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
// exports.bookAppointment = async (req, res) => {
//   try {
//     const businessId = req.params.id;
//     const { serviceId, date, time, customerName, customerPhone, notes } =
//       req.body;

//     if (!serviceId || !date || !time || !customerName || !customerPhone) {
//       return res
//         .status(400)
//         .json({ error: "All required fields must be provided" });
//     }

//     const business = await Business.findById(businessId).select(
//       "name address services"
//     );
//     if (!business) {
//       return res.status(404).json({ error: "Business not found" });
//     }

//     const service = business.services.id(serviceId);
//     if (!service) {
//       return res.status(404).json({ error: "Service not found" });
//     }

//     const newAppointment = new appointment({
//       businessId,
//       serviceId,
//       date,
//       time,
//       customerName,
//       customerPhone,
//       notes,
//       serviceName: service.name,
//       servicePrice: service.price,
//       duration: service.duration,
//     });

//     await newAppointment.save();

//     res.status(200).json({
//       message: "Appointment booked successfully",
//       bookingDetails: {
//         businessName: business.name,
//         businessAddress: business.address,
//         serviceName: service.name,
//         servicePrice: service.price,
//         date,
//         time,
//         duration: service.duration,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to book appointment" });
//   }
// };

// Add to waiting list
exports.addToWaitingList = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { email, serviceType, date } = req.body;

    // 1) Validate the business
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const serviceExists = business.services.some(
      (service) => service.name.toLowerCase() === serviceType.toLowerCase()
    );
    if (!serviceExists) {
      return res
        .status(404)
        .json({ error: "Service not found for this business" });
    }

    const waitingEntry = new WaitingList({
      businessId,
      email,
      serviceType,
      date,
    });

    await waitingEntry.save();

    // 5) Respond to the client
    return res.status(201).json({
      message: "Successfully added to waiting list",
      waitingEntry,
    });
  } catch (error) {
    console.error("Error adding to waiting list:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { fullName, email, phoneNumber } = req.body;
    // const userId = req.userId;

    //const userEmail = await User.findById(email);
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // Check if appointment exists and is hot
    const selectedAppointment = await appointment.findById(appointmentId);
    if (!selectedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (selectedAppointment.currentTemporaryOwnerEmail) {
      const result = await UserAppointment.findOneAndDelete({
        businessId: selectedAppointment.businessId,
        email: selectedAppointment.currentTemporaryOwnerEmail,
        serviceType: selectedAppointment.serviceType,
      });
      if (!result) {
        console.log("could not do that !!");
        return res.status(404).json({
          success: false,
          message: "No matching appointment found to remove.",
        });
      }
    }

    const business = await Business.findById(selectedAppointment.businessId);
    if (!business) {
      return res
        .status(404)
        .json({ message: "Business Id does not exist Error" });
    }
    const appointmentAddress = business.address || "Default Location";

    // Create new user appointment linked to the business appointment
    const newAppointment = new UserAppointment({
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      businessId: selectedAppointment.businessId,
      businessName: selectedAppointment.businessName,
      address: appointmentAddress,
      serviceType: selectedAppointment.serviceType,
      price:
        selectedAppointment.discountPrice || selectedAppointment.originalPrice,
      date: selectedAppointment.date,
      time: selectedAppointment.time,
      status: "appointment-taken",
    });

    // Save user appointment
    const savedAppointment = await newAppointment.save();

    // Remove the appointment from availability
    await appointment.findByIdAndDelete(appointmentId);
    /*if (!userEmail) {
      res.status(201).json({
        message:
          "Appointment booked successfully, the email not foun, please sign up with the same email!",
        appointment: savedAppointment,
      });
    }*/

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: savedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
