const Presentation = require("../models/presentationModel");

const getPresentationsByUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const presentations = await Presentation.getAllById(userId);
    res.status(200).json({
      status: "OK",
      result: presentations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Internal Server Error",
      error: "Failed to fetch presentations",
    });
  }
};

const createPresentation = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;
  try {
    await Presentation.create({ name, userId });
    res.status(201).json({
      status: "Created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save presentation" });
  }
};

const createSections = async (req, res) => {
  try {
    const { title, description, sort, presentation_id } = req.body;
    if (!presentation_id) {
      return res
        .status(400)
        .json({ error: "presentation_id is required in the request body" });
    }

    const existingPresentation = await Presentation.getAllById(presentation_id);

    if (existingPresentation.length === 0) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    await Presentation.create({ title, description, sort, presentation_id });
    res.status(201).json({
      status: "Created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save presentation" });
  }
};
const getSectionsByPresentationId = async (req, res) => {
    const { presentation_id } = req.params;
    if (!presentation_id) {
      return res
        .status(400)
        .json({ error: "presentation_id is required in the URL" });
    }
  
    try {
      const sections = await Presentation.getSectionsById(presentation_id);
      res.json(sections);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch sections" });
    }
  };

module.exports = {
  getPresentationsByUser,
  createPresentation,
  createSections,
  getSectionsByPresentationId,
};
