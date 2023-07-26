const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  games_count: {
    type: Number,
    required: true,
  },
  image_background: {
    type: String,
    required: true,
  },
});

const GenresModel = mongoose.model("Genres", genresSchema);

module.exports = { GenresModel };
