const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String },
  yearReleased: { type: String },
  genre: { type: [String] },
  distributor: { type: String },
  picUrl: { type: String }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
