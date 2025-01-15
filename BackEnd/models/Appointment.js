const mongoose = require("mongoose");

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

module.exports = mongoose.model("Appointment", appointmentSchema);
