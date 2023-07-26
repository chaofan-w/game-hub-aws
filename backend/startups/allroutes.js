const express = require("express");
// const config = require("config");
const sendResponse = require("./utils");
const cors = require("cors");

const {
  startupDebugger,
  dbDebugger,
  rawgDebugger,
  httpDebugger,
} = require("./debugger");

const helmet = require("helmet");
const morgan = require("morgan");

//############### import all routes here ################
const authMiddleware = require("../middleware/authMiddleware");
const gamesRouter = require("../routes/games");
const genresRouter = require("../routes/genres");
const platformsRouter = require("../routes/platforms");
const publishersRouter = require("../routes/publishers");
const tagsRouter = require("../routes/tags");
const authRouter = require("../routes/auth");
const usersRouter = require("../routes/users");
const rentalsRouter = require("../routes/rentals");

module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("tiny"));
    app.use(helmet());
    startupDebugger(
      "Morgan enabled, Helmet enabled under development environment"
    );
  }

  // app.use(
  //   cors({
  //     origin: "https://fegamehub.d3pcudhfx4cqp2.amplifyapp.com",
  //     methods: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS"],
  //     allowedHeaders: ["Content-Type", "X-Auth-Token"],
  //     exposedHeaders: ["X-Auth-Token"],
  //   })
  // );
  // app.options("*", cors()); // enable preflight request for all routes

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"));
  // app.use(
  //   cors({
  //     origin: "https://fegamehub.d3pcudhfx4cqp2.amplifyapp.com",
  //     methods: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS"],
  //     allowedHeaders: ["Content-Type", "X-Auth-Token"],
  //     exposedHeaders: ["X-Auth-Token"],
  //   })
  // );

  // app.options("*", cors()); // enable preflight request for all routes

  //################# use all routes here #################

  app.use("/api/games", gamesRouter);
  app.use("/api/genres", genresRouter);
  app.use("/api/platforms", platformsRouter);
  app.use("/api/publishers", publishersRouter);
  app.use("/api/tags", tagsRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/rentals", rentalsRouter);
  app.use("/", (req, res) => {
    sendResponse(res, 200, null, "Welcome to Game Rental API");
  });

  app.get("*", (req, res) => {
    const logger = app.get("logger");
    logger.error("Route not found");
    sendResponse(res, 404, null, "Route not found");
  });
};
