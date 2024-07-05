const express = require("express");
const router = express.Router();

const Book = require("../controllers/book.controller");
const { fileUpload } = require("../lib");

router
  .route("/")
  .get(Book.index)
  .post(fileUpload(["image/jpg", "image/jpeg"], 1024 * 1024 * 2), Book.store);
router
  .route("/:id")
  .get(Book.show)
  .patch(fileUpload(["image/jpg", "image/jpeg"], 1024 * 1024 * 2), Book.update)
  .delete(Book.destroy);

module.exports = router;
