const express = require("express");
const router = express.Router();
const { getAllTags } = require("../callbacks/tagsCallbacks");

router.get("/", getAllTags);

module.exports = router;
