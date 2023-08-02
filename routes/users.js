/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       200:
 *         description: User registration successful
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *             example:
 *               - username: john_doe
 *                 createdAt: "2023-08-02T10:00:00.000Z"
 *               - username: jane_smith
 *                 createdAt: "2023-08-02T11:00:00.000Z"
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/delete-account:
 *   delete:
 *     summary: Delete the user's account
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               password: password123
 *     responses:
 *       200:
 *         description: User login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */

const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { signUp, getUsers, login, deleteUser } = require('../controllers/userController');

router.post("/sign-up", signUp);

router.get("/users", verifyToken, getUsers);

router.delete("/delete-account", verifyToken, deleteUser);

router.post("/login", login);

module.exports = router;