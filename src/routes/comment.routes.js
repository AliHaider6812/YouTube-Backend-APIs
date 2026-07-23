const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { commentSchema } = require("../validations/comment.validation");

const commentController = require("../controllers/comment.controller");
const verifyJWT = require("../middlewares/auth.middleware");

// Create Comment





/**
 * @swagger
 * /comments/{videoId}:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Create a comment
 *     description: Creates a new comment on a specific video.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Amazing video!
 *     responses:
 *       201:
 *         description: Comment created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Video not found.
 */
router.post(
  "/:videoId",
  verifyJWT,
  validate(commentSchema),
  commentController.createComment
);




/**
 * @swagger
 * /comments/{videoId}:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get comments by video
 *     description: Returns all comments for a specific video.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID.
 *     responses:
 *       200:
 *         description: Comments fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Video not found.
 */
router.get("/:videoId", verifyJWT, commentController.getCommentsByVideo);



/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     tags:
 *       - Comment
 *     summary: Update comment
 *     description: Updates a comment owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment.
 *     responses:
 *       200:
 *         description: Comment updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Comment not found.
 */
router.patch(
  "/:id",
  verifyJWT,
  validate(commentSchema),
  commentController.updateComment
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: Delete comment
 *     description: Deletes a comment owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID.
 *     responses:
 *       200:
 *         description: Comment deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Comment not found.
 */
router.delete("/:id", verifyJWT, commentController.deleteComment);

module.exports = router;