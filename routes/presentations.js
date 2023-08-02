const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getPresentationsByUser,
  createPresentation,
  createSections,
  deletePresentation,
  updatePresentation,
  getSections,
  deleteSections,
  putSections,
} = require("../controllers/presentationController");

router.get("/", verifyToken, getPresentationsByUser);

router.post("/", verifyToken, createPresentation);

router.delete("/:id", verifyToken, deletePresentation);

router.put("/:id", verifyToken, updatePresentation);

router.post("/sections", verifyToken, createSections);

router.get("/sections/:presentation_id", verifyToken, getSections);

router.delete("/sections/:section_id", verifyToken, deleteSections);

router.put("/sections/:section_id", verifyToken, putSections);


module.exports = router;
