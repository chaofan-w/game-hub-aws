const sendResponse = require("../startups/utils");
const jwt = require("jsonwebtoken");
// const config = require("config");
const { dbDebugger } = require("../startups/debugger");

function authMiddleware(req, res, next) {
  const token = req.header("X-Auth-Token");
  if (!token)
    return sendResponse(res, 401, null, `Access denied. No token provided.`);
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    dbDebugger(error.message);
    return sendResponse(res, 400, null, "Invalid token.");
  }
}

module.exports = authMiddleware;
