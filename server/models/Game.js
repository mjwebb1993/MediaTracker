const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: { type: String },
  yearReleased: { type: String },
  genre: { type: [String] },
  console: { type: String },
  picUrl: { type: String }
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
