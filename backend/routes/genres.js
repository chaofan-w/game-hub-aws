const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  getGenreById,
  updateGenres,
} = require("../callbacks/genresCallbacks");

router.get("/", getAllGenres);
// router.get("/:id", getGenreById);
// router.post("/", updateGenres);

module.exports = router;
