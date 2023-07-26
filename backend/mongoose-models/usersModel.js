const mongoose = require("mongoose");
const Joi = require("joi");
const validator = require("validator");
const jwt = require("jsonwebtoken");
// const config = require("config");

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    isAdmin: Joi.boolean().default(false),
    createdDate: Joi.date().default(Date.now()),
    gameLibrary: Joi.array().items(Joi.number().min(1).max(999)),
  });
  return schema.validate(user);
};

const rentalSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  background_image: {
    type: String,
    required: true,
  },

  rentalStartDate: {
    type: Date,
    default: Date.now(),
  },
  rentalEndDate: {
    type: Date,
  },
});

const closedRentalSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  background_image: {
    type: String,
    required: true,
  },
  rentalRecords: [
    {
      rentalStartDate: {
        type: Date,
        required: true,
      },
      rentalEndDate: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
});

rentalSchema.pre("save", function (next) {
  const twoDays = 2 * 24 * 60 * 60 * 1000;
  this.rentalEndDate = this.rentalStartDate
    ? new Date(this.rentalStartDate.getTime() + twoDays)
    : null;
  next();
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      set: (value) =>
        value
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
          )
          .join(" "),
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      set: (value) =>
        value
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
          )
          .join(" "),
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      minlength: 3,
      maxlength: 50,
      trim: true,
      lowercase: true,
      validate: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email address",
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    createdDate: {
      type: Date,
      min: "2020-01-01T00:00:00.000Z",
      max: Date.now(),
      default: Date.now(),
    },
    gameLibrary: {
      type: Array,
      default: [],
    },
    openRentals: {
      type: [rentalSchema],
      default: [],
    },
    closedRentals: {
      type: [closedRentalSchema],
      default: [],
    },
  },
  { collection: "customers" }
);
// create a method to generate the token in the usersModel, specifically in the userSchema.methods.generateAuthToken()
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const UsersModel = mongoose.model("UsersModel", userSchema);

module.exports = { UsersModel, validateUser, userSchema };
