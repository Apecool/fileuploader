// config/multer.js
const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define where to save the files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define the file name
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage });

module.exports = upload;
