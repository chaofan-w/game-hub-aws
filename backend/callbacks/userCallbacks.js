const { dbDebugger } = require("../startups/debugger");

const {
  UsersModel,
  validateUser,
  userSchema,
} = require("../mongoose-models/usersModel");

const bcrypt = require("bcrypt");

const sendResponse = require("../startups/utils");

const currentUser = async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user._id).select(
      "-password -__v -isAdmin"
    );
    if (!user) return sendResponse(res, 404, null, "User not found");
    return sendResponse(res, 200, user, null);
  } catch (err) {
    return sendResponse(res, 400, null, err.message);
  }
};

const userRegister = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return sendResponse(res, 400, null, error.details[0].message);
    }
    user = new UsersModel(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return sendResponse(res, 200, null, "User registered successfully!");
  } catch (err) {
    if (
      err.message.includes("duplicate key error") &&
      err.message.includes("username")
    ) {
      return sendResponse(res, 400, null, "Username already exists");
    } else if (
      err.message.includes("duplicate key error") &&
      err.message.includes("email")
    ) {
      return sendResponse(res, 400, null, "Email already exists");
    } else {
      return sendResponse(res, 400, null, err.message);
    }
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UsersModel.findById(id).select("-password -__v");
    if (!user) return sendResponse(res, 404, null, "User not found");
    return sendResponse(res, 200, user, null);
  } catch (err) {
    return sendResponse(res, 400, null, err.message);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UsersModel.findByIdAndDelete(id);
    if (!user) return sendResponse(res, 404, null, "User not found");
    return sendResponse(res, 200, null, "User deleted successfully");
  } catch (err) {
    return sendResponse(res, 400, null, err.message);
  }
};

const updateUser = async (req, res) => {
  const id = req.user._id;
  // const { error } = validateUser(req.body);
  // if (error) {
  //   return sendResponse(res, 400, null, error.details[0].message);
  // }
  // console.log(`id: ${id}`);
  // console.log(req.body);
  try {
    const user = await UsersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) return sendResponse(res, 404, null, "User not found");
    return sendResponse(res, 200, user, null);
  } catch (err) {
    return sendResponse(res, 400, null, err.message);
  }
};

const getGameLibrary = async (req, res) => {
  const userId = req.user._id;
  // dbDebugger("getGameLibrary", userId);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const user = await UsersModel.findById(userId).select("gameLibrary -_id");
    if (!user) return sendResponse(res, 404, null, "User not found");
    if (user.gameLibrary.length === 0)
      return sendResponse(res, 404, null, "User game library is empty");
    const libraryGames = user.gameLibrary.slice(
      (page - 1) * limit,
      page * limit
    );
    // dbDebugger("getGameLibrary", libraryGames);
    return sendResponse(res, 200, libraryGames, null);
  } catch (err) {
    // dbDebugger(err);
    return sendResponse(res, 400, null, err.message);
  }
};

module.exports = {
  currentUser,
  userRegister,
  getUserById,
  deleteUser,
  updateUser,
  getGameLibrary,
};
