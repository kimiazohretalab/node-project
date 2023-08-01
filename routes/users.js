const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const {signUp, getUsers, login, deleteUser} = require('../controllers/userController')

router.post("/sign-up", signUp);

router.get("/users", verifyToken, getUsers);

router.delete("/delete-account", verifyToken, deleteUser);

router.post("/login", login);

module.exports = router;
