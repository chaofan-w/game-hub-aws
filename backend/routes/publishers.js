const express = require("express");
const router = express.Router();
const { getAllPublishers } = require("../callbacks/publishersCallbacks");

router.get("/", getAllPublishers);

module.exports = router;
