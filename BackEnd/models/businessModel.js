const mongoose = require("mongoose");

const openingHoursSchema = new mongoose.Schema({
  open: { type: String, required: true }, // e.g. "09:00"
  close: { type: String, required: true }, // e.g. "17:00"
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Haircut"
  durationMinutes: { type: Number, required: true }, // e.g. 30 (minutes)
  durationHours: { type: Number, required: true },
  price: { type: Number, required: true },
});

const agreementsSchema = new mongoose.Schema({
  advancePayment: { type: Number, required: true }, // Advance payment amount
  cancellationDays: { type: Number, required: true }, // Number of days before cancellation without a refund
  customerReward: { type: String, required: true }, // Reward for bringing a friend
});

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Salam Nails"
  address: { type: String, required: true }, // e.g. "Main St. 123"
  phoneNumber: { type: String, required: true },
  opueningHors: {
    sunday: { type: openingHoursSchema, required: true },
    monday: { type: openingHoursSchema, required: true },
    tuesday: { type: openingHoursSchema, required: true },
    wednesday: { type: openingHoursSchema, required: true },
    thursday: { type: openingHoursSchema, required: true },
    friday: { type: openingHoursSchema, required: true },
    saturday: { type: openingHoursSchema, required: true },
  },
  services: [serviceSchema], // array of { name, duration }

  profileImage: { type: String }, // Path to profile image
  images: { type: [String], default: [] }, // Paths to uploaded images
  agreements: agreementsSchema, // Agreements section
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", BusinessSchema);
