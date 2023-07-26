const express = require("express");
const router = express.Router();

const { userLogin } = require("../callbacks/authCallbacks");

// router.get("/", getUserByFilter);
router.post("/", userLogin);

module.exports = router;
