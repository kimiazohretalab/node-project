const Presentation = require("../models/presentationModel");

const getPresentationsByUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const presentations = await Presentation.getAllPresentationsByUserId(userId);
    res.status(200).json({
      status: "OK",
      result: presentations,
    });
  } catch (err) {
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
    await Presentation.createPresentation({ name, userId });
    res.status(201).json({
      status: "Created",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save presentation" });
  }
};

const deletePresentation = async (req, res) => {
  try {
    const { id } = req.params;
    await Presentation.deletePresentationById(id);
    res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      data: { error },
    });
  }
};

const updatePresentation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.userId;
    await Presentation.updatePresentationById(id, { name, user_id: userId });
    res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      data: { error },
    });
  }
};

const createSections = async (req, res) => {
  try {
    const { title, description, sort, presentation_id } = req.body;
    if (!presentation_id) {
      return res.status(400).json({ error: "presentation_id is required in the request body" });
    }
    await Presentation.createSection({ title, description, sort, presentation_id });
    res.status(201).json({
      status: "Created",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to save presentation" });
  }
};

const getSections = async (req, res) => {
  try {
    const { presentation_id } = req.params;
    const sections = await Presentation.getSectionsByPresentationId(presentation_id);
    res.status(200).json({
      status: "OK",
      result: sections,
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      error: "Failed to fetch presentations",
    });
  }
};

const deleteSections = async (req, res) => {
  try {
    const { section_id } = req.params;
    await Presentation.deleteSectionById(section_id);
    res.status(200).json({
      status: "OK",
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      error: "Failed to fetch presentations",
    });
  }
};

const putSections = async (req, res) => {
  try {
    const { section_id } = req.params;
    const { title, description, sort } = req.body;
    await Presentation.updateSectionById(section_id, { title, description, sort });
    res.status(200).json({
      status: "OK",
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      error: "Failed to fetch presentations",
    });
  }
};

module.exports = {
  getPresentationsByUser,
  createPresentation,
  deletePresentation,
  updatePresentation,
  createSections,
  getSections,
  deleteSections,
  putSections,
};