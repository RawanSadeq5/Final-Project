const {
  UserAppointment,
  WaitingList,
  appointment,
} = require("../models/Appointment");
const User = require("../models/User");
const Business = require("../models/businessModel");

// Get all appointments for a user
exports.getUserAppointments = async (req, res) => {
  try {
    // Replace with actual user ID (e.g., from auth middleware)
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User was not found",
      });
    }

    const userEmailAddress = user.emailAddress;

    let appointments = await UserAppointment.find({ email: userEmailAddress });

    // Update appointments where businessName is missing
    const updatedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        if (!appointment.businessName && appointment.businessId) {
          const business = await Business.findById(appointment.businessId);
          if (business) {
            appointment.businessName = business.BusinessName;
          }
        }
        return appointment;
      })
    );
    res.status(200).json({ success: true, appointments: updatedAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments." });
  }
};

// Get user's waiting list
exports.getUserWaitingList = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User was not found",
      });
    }

    const userEmailAddress = user.emailAddress;

    const waitingList = await WaitingList.find({ email: userEmailAddress });
    res.status(200).json({ success: true, waitingList });
  } catch (error) {
    console.error("Error fetching waiting list:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch waiting list." });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Find and delete the user appointment
    const userAppointment = await UserAppointment.findByIdAndDelete(
      appointmentId
    );
    if (!userAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }

    // Create a new Appointment from the canceled UserAppointment
    const newAppointment = new appointment({
      businessId: userAppointment.businessId,
      serviceType: userAppointment.serviceType,
      originalPrice: userAppointment.price,
      date: userAppointment.date,
      time: userAppointment.time,
      durationInMinutes: userAppointment.durationInMinutes,
      isHot: false,
    });

    await newAppointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment canceled and new appointment listed successfully.",
      newAppointment,
    });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel appointment." });
  }
};

// Delete an item from the waiting list
exports.deleteFromWaitingList = async (req, res) => {
  try {
    const { waitingId } = req.params;

    const waitingItem = await WaitingList.findByIdAndDelete(waitingId);
    if (!waitingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Waiting list item not found." });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from waiting list successfully.",
    });
  } catch (error) {
    console.error("Error deleting from waiting list:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete from waiting list." });
  }
};
