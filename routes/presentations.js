const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const {getPresentationsByUser, createPresentation, createSections, getSectionsByPresentationId} = require('../controllers/presentationController')


router.get("/", verifyToken, getPresentationsByUser);

router.post("/", verifyToken, createPresentation);

router.post("/sections", verifyToken, createSections);

router.get("/sections/:presentation_id", verifyToken, getSectionsByPresentationId);

module.exports = router;