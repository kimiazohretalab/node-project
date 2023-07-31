const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.secretKey;

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
  
    if (!token) {
      return res.status(403).json({ error: "Token not provided" });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  }

  module.exports = verifyToken;