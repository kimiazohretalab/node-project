const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const {signUp, getUsers, login} = require('../controllers/userController')

router.post("/sign-up", signUp);

router.get("/users", verifyToken, getUsers);

router.post("/login", login);

module.exports = router;
