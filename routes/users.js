const express = require("express");
const router = express.Router();
const db = require("../database");

// POST /users
router.post("/add-user", (req, res) => {
  const { name, password } = req.body;
  const sql = "INSERT INTO users (name, password) VALUES (?, ?)";
  db.query(sql, [name, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create user" });
    }
    const newUser = {
      id: result.insertId,
      name,
      password,
      created_at: new Date(),
    };
    res.status(201).json(newUser);
  });
});

// GET /users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.json(results);
  });
});

module.exports = router;