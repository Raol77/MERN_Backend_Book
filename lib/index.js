const multer = require("multer");

const showError = (err, next) => {
  next({
    message: `There was some error ` + err.message,
    status: 400,
  });
};

const fileUpload = (mimeTypes = [], maxSize) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".").pop();
      const filename = `${Date.now()}${
        Math.floor(Math.random() * 100) + 1
      }.${ext}`;
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    // Check if MIME type is allowed
    if (mimeTypes.length > 0 && !mimeTypes.includes(file.mimetype)) {
      return cb(new Error("File type not supported"), false);
    }

    // Check file size
    if (file.size > maxSize) {
      return cb(new Error("File size exceeds limit"), false);
    }

    cb(null, true);
  };

  const limits = {
    fileSize: maxSize, // Maximum file size in bytes
  };

  const upload = multer({ storage, fileFilter, limits }).single("image"); // Single file upload

  return upload;
};

module.exports = {
  showError,
  fileUpload,
};
