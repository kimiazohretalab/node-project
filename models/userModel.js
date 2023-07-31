const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getByName = async (name) => {
  try {
    const user = await prisma.users.findFirst({ where: { name: name, } });
    return user; 
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const users = await prisma.users.findMany();
    return users;
  } catch (error) {
    throw error;
  }
};
const getAllByName = async (name) => {
  try {
    const users = await prisma.users.findMany({ where: { name: name, } });
    return users;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const user = await prisma.users.create({ data: {
        name: data.name,
        password: data.hash,
        salt: data.salt, 
      }, });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getByName,
  getAll,
  create,
  getAllByName
};




