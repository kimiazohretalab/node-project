const express = require("express");
const router = express.Router();
const db = require("../database");
const verifyToken = require('../helpers/verifyToken')

router.get("/", verifyToken, (req, res) => {
  // Get the user ID from the request object
  const userId = req.user.userId;

  db.query("SELECT * FROM presentations WHERE user_id = ?", [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch presentations" });
    }
    res.json(results);
  });
});

router.post("/", verifyToken, (req, res) => {
  const { name } = req.body;
  // Get the user ID from the request object
  const userId = req.user.userId;

  // Save the presentation along with the user ID in the database
  const sql = "INSERT INTO presentations (name, user_id) VALUES (?, ?)";
  db.query(sql, [name, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save presentation" });
    }
    const newPresentation = {
      id: result.insertId,
      name,
      user_id: userId,
      created_at: new Date(),
    };

    // Send the response with the newly created presentation
    res.status(201).json(newPresentation);
  });
});

router.post("/sections", verifyToken, (req, res) => {
    const { title, description, sort, presentation_id } = req.body;
  
    if (!presentation_id) {
      return res.status(400).json({ error: "presentation_id is required in the request body" });
    }
  
    db.query("SELECT * FROM presentations WHERE id = ?", [presentation_id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch presentation" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: "Presentation not found" });
      }
  
      const sql = "INSERT INTO presentation_sections (title, description, sort, presentation_id) VALUES (?, ?, ?, ?)";
      db.query(sql, [title, description, sort, presentation_id], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Failed to save presentation section" });
        }
        const newSection = {
          id: result.insertId,
          title,
          description,
          sort,
          presentation_id,
          created_at: new Date(),
        };
        res.status(201).json(newSection);
      });
    });
  });

router.get("/sections/:presentation_id", verifyToken, (req, res) => {
    const { presentation_id } = req.params;
    db.query("SELECT * FROM presentation_sections WHERE presentation_id = ?", [presentation_id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Failed to fetch presentations" });
        }
        res.json(results);
      });
  });

module.exports = router;