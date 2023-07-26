const express = require("express");
// const config = require("config");
require("./startups/config")();
const cors = require("cors");

const {
  startupDebugger,
  dbDebugger,
  rawgDebugger,
  httpDebugger,
} = require("./startups/debugger");
const mongoose = require("mongoose");

const app = express();
app.use(
  cors({
    origin: "https://fegamehub.d3pcudhfx4cqp2.amplifyapp.com",
    methods: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Auth-Token"],
    exposedHeaders: ["X-Auth-Token"],
  })
);

app.options("*", cors()); // enable preflight request for all routes

require("./startups/allroutes")(app);
require("./startups/logging")(app);
require("./startups/connectDB")();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  startupDebugger(`Server is running on port ${port}`);
});

process.on("SIGINT", async () => {
  dbDebugger("Closing the database connection...");
  try {
    await mongoose.disconnect();
    dbDebugger("MongoDB disconnected...");
    process.exit(0);
  } catch (error) {
    dbDebugger("Error while closing the database connection:", error);
    process.exit(1);
  }
});
