const { model, Schema } = require("mongoose");
const Book = model(
  "Book",
  new Schema({
    bookName: {
      type: String,
      unique: true,
      required: true,
    },
    bookPrice: {
      type: Number,
      required: true,
    },
    isbnNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  })
);

module.exports = Book;
