const sendResponse = require("../startups/utils");
const jwt = require("jsonwebtoken");
// const config = require("config");
const { dbDebugger } = require("../startups/debugger");

function adminMiddleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return sendResponse(res, 401, null, "Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    dbDebugger("req.user:", req.user);
    if (!req.user.isAdmin)
      return sendResponse(res, 403, null, "Access denied. Not an admin.");
    dbDebugger("admin logged in");
    next();
  } catch (error) {
    dbDebugger(error.message);
    return sendResponse(res, 400, null, "Invalid token.");
  }
}

module.exports = adminMiddleware;
