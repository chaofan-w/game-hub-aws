const express = require("express");
const router = express.Router();
const {
  getAllPlatforms,
  getPlatformById,
} = require("../callbacks/platformsCallbacks");

router.get("/", getAllPlatforms);
router.get("/:id", getPlatformById);

module.exports = router;
