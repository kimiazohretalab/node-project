/**
 * @swagger
 * tags:
 *   name: Presentations
 *   description: API endpoints for managing presentations
 */

/**
 * @swagger
 * /presentations:
 *   get:
 *     summary: Get all presentations for the user
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns an array of presentations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *             example:
 *               - id: 1
 *                 name: Presentation 1
 *                 created_at: "2023-08-02T10:00:00.000Z"
 *                 updated_at: "2023-08-02T11:00:00.000Z"
 *               - id: 2
 *                 name: Presentation 2
 *                 created_at: "2023-08-02T12:00:00.000Z"
 *                 updated_at: "2023-08-02T13:00:00.000Z"
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /presentations:
 *   post:
 *     summary: Create a new presentation
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: My Presentation
 *     responses:
 *       201:
 *         description: Presentation created successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /presentations/{id}:
 *   delete:
 *     summary: Delete a presentation
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the presentation to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Presentation deleted successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /presentations/{id}:
 *   put:
 *     summary: Update a presentation
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the presentation to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Updated Presentation
 *     responses:
 *       200:
 *         description: Presentation updated successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /presentations/sections:
 *   post:
 *     summary: Create a new section for a presentation
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               sort:
 *                 type: integer
 *               presentation_id:
 *                 type: integer
 *             example:
 *               title: Introduction
 *               description: Introduction to the presentation
 *               sort: 1
 *               presentation_id: 1
 *     responses:
 *       201:
 *         description: Section created successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /presentations/sections/{presentation_id}:
 *   get:
 *     summary: Get all sections for a presentation
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: presentation_id
 *         in: path
 *         description: ID of the presentation to get sections for
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns an array of sections for the presentation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   sort:
 *                     type: integer
 *                   presentation_id:
 *                     type: integer
 *             example:
 *               - id: 1
 *                 title: Introduction
 *                 description: Introduction to the presentation
 *                 sort: 1
 *                 presentation_id: 1
 *               - id: 2
 *                 title: Conclusion
 *                 description: Conclusion of the presentation
 *                 sort: 2
 *                 presentation_id: 1
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /presentations/sections/{section_id}:
 *   delete:
 *     summary: Delete a section from a presentation
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: section_id
 *         in: path
 *         description: ID of the section to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /presentations/sections/{section_id}:
 *   put:
 *     summary: Update a section in a presentation
 *     tags: [Presentations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: section_id
 *         in: path
 *         description: ID of the section to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               sort:
 *                 type: integer
 *             example:
 *               title: Updated Introduction
 *               description: Updated Introduction to the presentation
 *               sort: 1
 *     responses:
 *       200:
 *         description: Section updated successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 */

const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  getPresentationsByUser,
  createPresentation,
  createSections,
  deletePresentation,
  updatePresentation,
  getSections,
  deleteSections,
  putSections,
} = require("../controllers/presentationController");

router.get("/", verifyToken, getPresentationsByUser);

router.post("/", verifyToken, createPresentation);

router.delete("/:id", verifyToken, deletePresentation);

router.put("/:id", verifyToken, updatePresentation);

router.post("/sections", verifyToken, createSections);

router.get("/sections/:presentation_id", verifyToken, getSections);

router.delete("/sections/:section_id", verifyToken, deleteSections);

router.put("/sections/:section_id", verifyToken, putSections);

module.exports = router;