const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.secretKey;

const signUp = async (req, res) => {
  try {
    const { name, password } = req.body;
    const checkUserExistsQuery = await User.getByName(name);
    if (checkUserExistsQuery === null) {
      bcrypt.genSalt(10, async (err, salt) => {
        if (err) {
          return res.status(500).json({ error: "Failed to create user" });
        }
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            return res.status(500).json({ error: "Failed to create user" });
          }
          const data = await User.create({ name, hash, salt });
          res.status(201).json({
            status: "Created",
            data,
          });
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      data: { error },
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await User.getAll();
    res.status(200).json({
      status: "OK",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      data: { error },
    });
  }
};
const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.getByName(name);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id, name: user.name }, secretKey, {
        expiresIn: "10h",
      });
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      data: { error },
    });
  }
};
const deleteUser = async (req, res) => {
  try{
    const userId = req.user.userId;
    await User.deleteById(userId);
    res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      data: { error },
    });
  }
}

module.exports = {
  signUp,
  getUsers,
  login,
  deleteUser,
};
