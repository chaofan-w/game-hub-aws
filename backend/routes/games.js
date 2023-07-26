const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllGames,
  getGameById,
  getGamesByFilter,
  getGamesByArrayOfIds,
  getUserGameLibrary,
  importToMongo,
  getSuggestedGames,
} = require("../callbacks/gamesCallbacks");

// router.options("*", (req, res) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://fegamehub.d3pcudhfx4cqp2.amplifyapp.com"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token");
//   res.exposedHeaders = ["X-Auth-Token"];
//   res.sendStatus(200);
// });

router.get("/", getAllGames);
// router.post("/", importToMongo);
router.get("/suggestions/:keyword", getSuggestedGames);
router.get("/gamelibrary/:ids", getGamesByArrayOfIds);
router.get("/filter/:filter/:value", getGamesByFilter);
router.get("/userlibrary", authMiddleware, getUserGameLibrary);
router.get("/:id", getGameById);

module.exports = router;
