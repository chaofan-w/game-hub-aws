const { UsersModel } = require("../mongoose-models/usersModel");
const {
  startupDebugger,
  dbDebugger,
  requestDebugger,
} = require("../startups/debugger");
const sendResponse = require("../startups/utils");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(req);
};

const userLogin = async (req, res) => {
  //validate the input data format
  const { error } = validate(req.body);
  if (error) {
    return sendResponse(res, 400, null, error.details[0].message);
  }
  // validate the user email exists in the database
  let user = await UsersModel.findOne({ email: req.body.email });
  if (!user) return sendResponse(res, 400, null, "Invalid email or password");

  // validate the user password matched the one in the database
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return sendResponse(res, 400, null, "Invalid email or password");

  // in userSchema, we have created a method in the userSchema.methods.generateAuthToken() to generate the token
  // so here the user is an instance of the UsersModel, so we can use the method generateAuthToken() on it
  const token = user.generateAuthToken();

  return sendResponse(res, 200, token, "User logged in successfully");
  // after return the token, at frontend, we can store the token in the localStorage, and then use it as the header for the frontend request.
};

module.exports = {
  userLogin,
};
