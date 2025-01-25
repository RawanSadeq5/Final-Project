const multer = require("multer");
const path = require("path");

// Supported file types
const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

// 1) Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the folder exists or handle errors
    cb(null, "uploads"); // Use the "uploads" folder
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
    cb(null, true); // Accept the file
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
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a 5MB file size limit
  fileFilter,
});

// 4) Export the configured upload middleware
module.exports = upload;
