// config/multerConfig.js
const multer = require("multer");
const path = require("path");

// 1) Configure the storage to define where and how the files should be saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // "uploads" is the folder where files will be stored
    // You can change it to "public/images" or any other folder
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // Generate a unique file name (e.g., "profileImage-1673891234567.png")
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // path.extname(file.originalname) gets the file’s extension (.png, .jpg, etc.)
    const fileExtension = path.extname(file.originalname);
    // file.fieldname could be "images" or "profileImage", depending on your field name
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

// 2) Create the upload object with the storage config
const upload = multer({ storage });

// 3) Export the upload so it can be used in routes
module.exports = upload;
