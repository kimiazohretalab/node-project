const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllPresentationsByUserId = async (userId) => {
  return prisma.presentations.findMany({
    where: { user_id: userId },
  });
};

const getAllSectionsByPresentationId = async (presentationId) => {
  return prisma.presentation_sections.findMany({
    where: { presentation_id: parseInt(presentationId, 10) },
  });
};

const createPresentation = async (data) => {
  return prisma.presentations.create({
    data: {
      name: data.name,
      user_id: data.userId,
      updated_at: new Date(),
    },
  });
};

const deletePresentationById = async (id) => {
  return prisma.presentations.delete({
    where: { id: parseInt(id, 10) },
  });
};

const deleteSectionById = async (id) => {
  const existingSection = await prisma.presentation_sections.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!existingSection) {
    throw new Error("Section not found");
  }

  return prisma.presentation_sections.delete({
    where: { id: parseInt(id, 10) },
  });
};

const updateSectionById = async (id, data) => {
  return prisma.presentation_sections.update({
    where: { id: parseInt(id, 10) },
    data: {
      title: data.title,
      description: data.description,
      sort: data.sort,
    },
  });
};

const updatePresentationById = async (id, data) => {
  return prisma.presentations.update({
    where: { id: parseInt(id, 10) },
    data: {
      name: data.name,
      user_id: data.user_id,
      updated_at: new Date(),
    },
  });
};

const createSection = async (data) => {
  return prisma.presentation_sections.create({
    data: {
      title: data.title,
      description: data.description,
      sort: data.sort,
      presentation_id: data.presentation_id,
    },
  });
};

const getSectionsByPresentationId = async (presentationId) => {
  return prisma.presentation_sections.findMany({
    where: { presentation_id: parseInt(presentationId, 10) },
  });
};

module.exports = {
  getAllPresentationsByUserId,
  createPresentation,
  createSection,
  updatePresentationById,
  getSectionsByPresentationId,
  deletePresentationById,
  getAllSectionsByPresentationId,
  deleteSectionById,
  updateSectionById,
};