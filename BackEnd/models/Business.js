const mongoose = require("mongoose");

const openingHoursSchema = new mongoose.Schema({
  open: { type: String, required: true }, // e.g. "09:00"
  close: { type: String, required: true }, // e.g. "17:00"
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Haircut"
  duration: { type: Number, required: true }, // e.g. 30 (minutes)
});

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Salam Nails"
  address: { type: String, required: true }, // e.g. "Main St. 123"
  phoneNumber: { type: String, required: true },
  openingHours: {
    sunday: { type: openingHoursSchema, required: true },
    monday: { type: openingHoursSchema, required: true },
    tuesday: { type: openingHoursSchema, required: true },
    wednesday: { type: openingHoursSchema, required: true },
    thursday: { type: openingHoursSchema, required: true },
    friday: { type: openingHoursSchema, required: true },
    saturday: { type: openingHoursSchema, required: true },
  },
  services: [serviceSchema], // array of { name, duration }

  // Store image paths/URLs for the business
  images: [{ type: String }], // e.g. ["uploads/business1/img1.jpg", ...]

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", businessSchema);
