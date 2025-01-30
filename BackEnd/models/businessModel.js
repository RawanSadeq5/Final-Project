/**
 * Business Model
 * This module defines the Mongoose schema for business entities, enabling efficient
 * management of service providers in the appointment booking system.
 *
 * 1) `openingHoursSchema`:
 *    - Defines the business's working hours for each day of the week.
 *
 * 2) `serviceSchema`:
 *    - Represents the services provided by the business, including name, duration, and price.
 *
 * 3) `agreementsSchema`:
 *    - Stores business policies, such as advance payments, cancellation policies, and customer rewards.
 *
 * 4) `BusinessSchema`:
 *    - Contains essential business details, including owner name, business name, contact info, and address.
 *    - Holds references to services, working hours, and agreements.
 *    - Includes an optional profile image.
 **/

const mongoose = require("mongoose");

const openingHoursSchema = new mongoose.Schema({
  open: { type: String },
  close: { type: String },
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  durationHours: { type: Number, required: true },
  price: { type: Number, required: true },
});

const agreementsSchema = new mongoose.Schema({
  advancePayment: { type: Number, required: true },
  cancellationDays: { type: Number, required: true },
  customerReward: { type: String, required: true },
});

const BusinessSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  BusinessName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  businessPassword: { type: String, required: true },
  address: { type: String, required: true },
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
  services: [serviceSchema],

  profileImage: { type: String },
  agreements: agreementsSchema,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Business", BusinessSchema);
