const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");

const validateGames = (game) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().min(3).max(255).required(),
    released: Joi.date().required(),
    background_image: Joi.string().min(3).max(255).required(),
    rating: Joi.number().required(),
    ratings_count: Joi.number().required(),
    platforms: Joi.array().items(Joi.string().min(3).max(50)),
  });
  return schema.validate(game);
};

const gamesSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  released: {
    type: Date,
    required: true,
  },
  background_image: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  ratings_count: {
    type: Number,
    required: true,
  },
  platforms: {
    type: [String],
    minlength: 3,
    maxlength: 50,
  },
  genres: {
    type: [String],
    minlength: 3,
    maxlength: 50,
  },
});

const GamesModel = mongoose.model("Games", gamesSchema);

module.exports = { GamesModel, validateGames };
