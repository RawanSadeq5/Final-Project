const mongoose = require("mongoose");

//business appointment
const appointmentSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  serviceType: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number }, // if there's a discount
  date: { type: String, required: true }, // e.g. "12/01/2025"
  time: { type: String, required: true }, // e.g. "12:05"
  durationInMinutes: { type: Number, required: true },
  isHot: { type: Boolean, default: false }, // indicates a "hot" appointment
});

// User Appointment Schema
const UserAppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  businessName: { type: String, required: true },
  address: { type: String, required: true },
  serviceType: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  durationInMinutes: { type: Number, required: true },
  status: {
    type: String,
    enum: ["appointment-taken", "ready-to-give-up"],
    default: "appointment-taken",
  },
});

// Waiting List Schema
const WaitingListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  businessName: { type: String, required: true },
  address: { type: String, required: true },
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
