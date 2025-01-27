const mongoose = require("mongoose");

const openingHoursSchema = new mongoose.Schema({
  open: { type: String }, // e.g. "09:00"
  close: { type: String }, // e.g. "17:00"
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
  fullName: { type: String, required: true },
  BusinessName: { type: String, required: true }, // e.g. "Salam Nails"
  businessEmail: { type: String, required: true },
  businessPassword: { type: String, required: true },
  address: { type: String, required: true }, // e.g. "Main St. 123"
  phoneNumber: { type: String, required: true },
  openingHours: [
    { sunday: { type: openingHoursSchema } },
    { monday: { type: openingHoursSchema } },
    { tuesday: { type: openingHoursSchema } },
    { wednesday: { type: openingHoursSchema } },
    { thursday: { type: openingHoursSchema } },
    { friday: { type: openingHoursSchema } },
    { saturday: { type: openingHoursSchema } },
  ],
  services: [serviceSchema], // array of { name, duration }

  profileImage: { type: String }, // Path to profile image
  agreements: agreementsSchema, // Agreements section
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", BusinessSchema);
