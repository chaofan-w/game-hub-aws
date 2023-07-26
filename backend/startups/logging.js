const winston = require("winston");
// const config = require("config");
const { startupDebugger } = require("./debugger");

module.exports = function (app) {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },

    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  app.set("logger", logger);

  if (!process.env.JWT_PRIVATE_KEY) {
    startupDebugger("FATAL ERROR: JWT_PRIVATE_KEY is not defined");
    process.exit(1);
  }
};
