const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  userRegister,
  currentUser,
  getUserById,
  deleteUser,
  updateUser,
  getGameLibrary,
} = require("../callbacks/userCallbacks");

// it is the normal practices to use /me to get the current user information;
// router.options("*", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token");
//   res.exposedHeaders = ["X-Auth-Token"];
//   res.sendStatus(200);
// });

router.get("/me", authMiddleware, currentUser);
router.patch("/update", authMiddleware, updateUser);
router.post("/register", userRegister);
router.get("/gameLibrary", authMiddleware, getGameLibrary);
router.get("/:id", adminMiddleware, getUserById);
router.delete("/:id", adminMiddleware, deleteUser);

module.exports = router;
