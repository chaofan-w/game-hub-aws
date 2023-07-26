const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllOpenRentals,
  addRentals,
  deleteRentals,
  automaticCloseRentals,
  getAllClosedRentals,
} = require("../callbacks/rentalsCallbacks");

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

router.get("/open", authMiddleware, getAllOpenRentals);
router.post("/open", authMiddleware, addRentals);
router.delete("/open", authMiddleware, deleteRentals);
router.delete("/open/automatic", authMiddleware, automaticCloseRentals);
router.get("/closed", authMiddleware, getAllClosedRentals);

module.exports = router;
