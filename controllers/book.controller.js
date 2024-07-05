const { showError } = require("../lib");
const Book = require("../models/book.model");
const { unlink } = require("node:fs/promises");
class BookController {
  index = async (req, res, next) => {
    try {
      const book = await Book.find();
      res.json(book);
    } catch (error) {
      showError(error, next);
    }
  };
  store = async (req, res, next) => {
    try {
      const { bookName, bookPrice, isbnNumber, authorName, publishedAt } =
        req.body;
      const image = req.file.filename;
      await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        image,
      });
      res.json({
        success: `Book Created`,
      });
    } catch (error) {
      showError(error, next);
    }
  };
  show = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      res.json(book);
    } catch (error) {
      showError(error, next);
    }
  };
  update = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      console.log(book);
      const { bookName, bookPrice, isbnNumber, authorName, publishedAt } =
        req.body;
      console.log(book.image);
      if (req.file) {
        console.log(book.image);
        await unlink(`uploads/${book.image}`);
        const image = req.file.filename;
        await Book.findByIdAndUpdate(req.params.id, {
          bookName,
          bookPrice,
          isbnNumber,
          authorName,
          publishedAt,
          image,
        });
      } else {
        await Book.findByIdAndUpdate(req.params.id, {
          bookName,
          bookPrice,
          isbnNumber,
          authorName,
          publishedAt,
        });
      }

      res.json({
        success: `Book updated`,
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const book = await Book.findById(req.params.id);
      await unlink(`uploads/${book.image}`);
      await Book.findByIdAndDelete(req.params.id);
      res.json({
        success: `Book successfully deleted`,
      });
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new BookController();
