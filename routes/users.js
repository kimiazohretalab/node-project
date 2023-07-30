const express = require("express");
const router = express.Router();
const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require('../helpers/verifyToken')

const secretKey = "123456";

// POST /sign-up
router.post("/sign-up", (req, res) => {
  const { name, password } = req.body;
  // Check if the username already exists in the database
  const checkUserExistsQuery = "SELECT id FROM users WHERE name = ?";
  db.query(checkUserExistsQuery, [name], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    if (rows.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Generate a salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create user" });
      }

      // Hash the password with the generated salt
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: "Failed to create user" });
        }

        // Save the user with the hashed password and salt in the database
        const sql = "INSERT INTO users (name, password, salt) VALUES (?, ?, ?)";
        db.query(sql, [name, hash, salt], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to create user" });
          }
          const newUser = {
            id: result.insertId,
            name,
            created_at: new Date(),
          };
          res.status(201).json(newUser);
        });
      });
    });
  });
});

// GET /users
router.get("/users", verifyToken, (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.json(results);
  });
});

// POST/login
router.post("/login", (req, res) => {
  const { name, password } = req.body;

  // Find the user with the given name in the database
  const sql = "SELECT * FROM users WHERE name = ?";
  db.query(sql, [name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch user" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];

    // Compare the provided password with the hashed password from the database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Passwords match, create and send the JWT token in the response
      const token = jwt.sign(
        { userId: user.id, name: user.name },
        secretKey,
        {
          expiresIn: "1h", // You can adjust the expiration time as needed
        }
      );

      res.json({ token });
    });
  });
});

module.exports = router;
