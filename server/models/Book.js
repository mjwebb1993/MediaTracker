const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String },
  yearReleased: { type: String },
  genre: { type: [String] },
  author: { type: String },
  picUrl: { type: String }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
