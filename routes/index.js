const express = require("express");
const router = express.Router();

const bookRoute = require("./book.route");

router.use("/books", bookRoute);

router.get("/image/:filename", (req, res, next) => {
  res.sendFile(`uploads/${req.params.filename}`, {
    root: "./",
  });
});

router.use((req, res, next) => {
  next({
    status: 404,
    message: `Page not found`,
  });
});

module.exports = router;
