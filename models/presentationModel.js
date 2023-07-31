const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllById = async (id) => {
  try {
    const presentations = await prisma.presentations.findMany({
      where: { id: id },
    });
    return presentations;
  } catch (error) {
    throw error;
  }
};
const create = async (data) => {
  try {
    const user = await prisma.presentations.create({
      data: {
        name: data.name,
        user_id: data.userId,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
const createSection = async (data) => {
  try {
    const section = await prisma.presentation_sections.create({
      data: {
        title: data.title,
        description: data.description,
        sort: data.sort,
        presentation_id: data.presentation_id,
      },
    });
    return section;
  } catch (error) {
    throw error;
  }
};
const getSectionsById = async (id) => {
  try {
    const presentationId = parseInt(id);
    const section = await prisma.presentation_sections.findMany({
      where: { presentation_id: presentationId },
    });
    return section;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllById, create, createSection, getSectionsById };
