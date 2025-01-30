/**
 * File Upload Middleware
 * This module configures and exports a Multer middleware for handling file uploads.
 * It allows users to upload image files (JPEG, PNG, or GIF) with a file size limit of 5MB.
 * - Uses `multer.diskStorage()` to store uploaded files in the "uploads" directory.
 * - Generates a unique filename using the field name, timestamp, and random number.
 * - Implements a file filter to restrict uploads to allowed image types.
 * - Limits file size to prevent excessively large uploads.
 **/

const multer = require("multer");
const path = require("path");

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

// 1) Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname); // Get file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

// 2) File filter for validation
const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Unsupported file type. Please upload JPEG, PNG, or GIF files."
      ),
      false
    );
  }
};

// 3) Upload instance with limits and file filter
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

// 4) Export the configured upload middleware
module.exports = upload;
