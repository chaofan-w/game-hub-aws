// const config = require("config");

//retrieve the value of the DEBUG environment variable
// const debugConfig = process.env.DEBUG;
// set the value of the DEBUG environment variable to the value of the DEBUG config property only if the DEBUG environment variable is not set on local computer, it will read the value from the config file -- default.json.
// process.env.DEBUG = debugConfig;

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const rawgDebugger = require("debug")("app:rawg");
const httpDebugger = require("debug")("app:http");

module.exports = { startupDebugger, dbDebugger, rawgDebugger, httpDebugger };
