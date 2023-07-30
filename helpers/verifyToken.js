// Middleware to verify JWT token
const jwt = require("jsonwebtoken");
const secretKey = "123456";

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
  
    if (!token) {
      return res.status(403).json({ error: "Token not provided" });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
  
      // Set the decoded user data on the request object for further use in the route
      req.user = decoded;
      next();
    });
  }

  module.exports = verifyToken;