/**
 * Appointment Models
 * This module defines Mongoose schemas for handling business appointments, user appointments,
 * and the waiting list. It facilitates efficient scheduling, tracking, and management of appointments.
 *
 * 1) Business Appointments:
 *    - Stores business-specific appointments with details like service type, price, date, and time.
 *    - Supports "hot appointments" with discounted prices.
 *
 * 2) User Appointments:
 *    - Tracks appointments booked by users.
 *    - Includes appointment status: "appointment-taken" or "ready-to-give-up".
 *
 * 3) Waiting List:
 *    - Manages users who wish to be notified if an appointment slot becomes available.
 *
 * Models:
 * - `Appointment`: Stores business appointments.
 * - `UserAppointment`: Tracks user bookings and appointment status.
 * - `WaitingList`: Maintains a waiting list for users.
 **/

const mongoose = require("mongoose");

//business appointment
const appointmentSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },

  serviceType: { type: String, required: true },
  originalPrice: { type: Number },
  discountPrice: { type: Number },
  date: { type: String, required: true },
  time: { type: String, required: true },
  durationInMinutes: { type: Number },
  isHot: { type: Boolean, default: false },
});

// User Appointment Schema
const UserAppointmentSchema = new mongoose.Schema({
  businessId: { type: String },
  businessName: { type: String },
  fullName: { type: String },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String, required: true },
  serviceType: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  durationInMinutes: { type: Number },
  status: {
    type: String,
    enum: ["appointment-taken", "ready-to-give-up"],
    default: "appointment-taken",
  },
});

// Waiting List Schema
const WaitingListSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  serviceType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

// Export models
const appointment = mongoose.model("Appointment", appointmentSchema);
const UserAppointment = mongoose.model(
  "UserAppointment",
  UserAppointmentSchema
);
const WaitingList = mongoose.model("WaitingList", WaitingListSchema);

module.exports = {
  UserAppointment,
  WaitingList,
  appointment,
};
