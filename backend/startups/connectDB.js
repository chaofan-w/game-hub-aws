const { startupDebugger, dbDebugger, requestDebugger } = require("./debugger");
const mongoose = require("mongoose");
// const config = require("config");

const MONGO_URI = process.env.MONGO_URI;

// startupDebugger("MONGO_URI:", MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, options);
//     dbDebugger("MongoDB connected...");
//   } catch (error) {
//     dbDebugger(error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

module.exports = function () {
  mongoose.connect(MONGO_URI, options).then(() => {
    startupDebugger("MongoDB connected...");
  });
  //since we have already setup the unhandledRejection event handler, we don't need to use the catch() method to catch the error here.
};
