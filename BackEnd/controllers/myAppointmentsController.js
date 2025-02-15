/**
 * File: appointmentsController.js
 * Description: This module manages user appointments, including status changes, retrieval, cancellations, and waiting list management
 *              within the NexTor appointment booking system. It provides API endpoints for users to interact with their bookings.
 *
 * Dependencies:
 * - Requires authentication via authMiddleware (token-based access control).
 * - Uses MongoDB models for Appointments, WaitingList, Users, and Businesses.
 * - Connects with business and user management modules for data consistency.
 **/

const {
  UserAppointment,
  WaitingList,
  appointment,
} = require("../models/Appointment");
const User = require("../models/User");
const Business = require("../models/businessModel");

exports.changeAppointmentStatus = async (req, res) => {
  try {
    //const userEmailAddress = user.emailAddress;
    const { appointmentId, newStatus } = req.body;

    // Grab the user ID from the token (set by authMiddleware)
    const userId = req.userId;

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User was not found.",
      });
    }

    const userAppointment = await UserAppointment.findById(appointmentId);
    if (!userAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found." });
    }
    if (userAppointment.status === newStatus) {
      return res
        .status(200)
        .json({ success: true, message: "This status is already set." });
    }

    userAppointment.status = newStatus;

    if (newStatus === "ready-to-give-up") {
      const newAppointment = new appointment({
        businessId: userAppointment.businessId,
        serviceType: userAppointment.serviceType,
        originalPrice: userAppointment.price,
        date: userAppointment.date,
        time: userAppointment.time,
        durationInMinutes: userAppointment.durationInMinutes,
        isHot: false,
        currentTemporaryOwnerEmail: userAppointment.email,
      });

      await newAppointment.save();
    } else {
      // lets search inside the appointment model for currentTemporaryOwnerEmail
      const result = await appointment.findOneAndDelete({
        businessId: userAppointment.businessId,
        currentTemporaryOwnerEmail: userAppointment.email,
        serviceType: userAppointment.serviceType,
      });
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "No matching appointment found to remove.",
        });
      }
    }

    await userAppointment.save();
    return res.status(200).json({
      success: true,
      message: "Appointment status updated successfully.",
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change appointment status.",
    });
  }
};

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

    const waitingList = await WaitingList.find({
      email: userEmailAddress,
    }).populate({
      path: "businessId",
      select: "BusinessName address",
    });
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
