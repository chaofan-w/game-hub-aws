// const config = require("config");
const {
  startupDebugger,
  dbDebugger,
  rawgDebugger,
  httpDebugger,
} = require("./debugger");

const nodeEnvConfig = process.env.NODE_ENV;
// process.env.NODE_ENV = "development";

module.exports = function () {
  startupDebugger(`NODE_ENV: ${nodeEnvConfig}`);
};
