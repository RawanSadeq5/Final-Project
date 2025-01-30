/**
 * User Model
 * This module defines the Mongoose schema for storing user information within the NexTor system.
 *
 * 1) `fullName`: Stores the full name of the user (required).
 * 2) `emailAddress`: Unique email address used for authentication (required).
 * 3) `password`: Hashed password for secure authentication (required).
 * 4) `userPhoneNumber`: Contact number of the user.
 **/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPhoneNumber: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
