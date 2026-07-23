const express = require("express");
const router = express.Router();

const likeController = require("../controllers/like.controller");
const verifyJWT = require("../middlewares/auth.middleware");

// Toggle Video Like



/**
 * @swagger
 * /likes/videos/{videoId}:
 *   post:
 *     tags:
 *       - Like
 *     summary: Toggle video like
 *     description: Likes or unlikes a video for the authenticated user.
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
 *         description: Like status updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Video not found.
 */
router.post(
  "/videos/:videoId",
  verifyJWT,
  likeController.toggleVideoLike
);



/**
 * @swagger
 * /likes/comments/{commentId}:
 *   post:
 *     tags:
 *       - Like
 *     summary: Toggle comment like
 *     description: Likes or unlikes a comment for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID.
 *     responses:
 *       200:
 *         description: Like status updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Comment not found.
 */

router.post(
  "/comments/:commentId",
  verifyJWT,
  likeController.toggleCommentLike
);


/**
 * @swagger
 * /likes/tweets/{tweetId}:
 *   post:
 *     tags:
 *       - Like
 *     summary: Toggle tweet like
 *     description: Likes or unlikes a tweet for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID.
 *     responses:
 *       200:
 *         description: Like status updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Tweet not found.
 */
router.post(
  "/tweets/:tweetId",
  verifyJWT,
  likeController.toggleTweetLike
);


/**
 * @swagger
 * /likes/videos:
 *   get:
 *     tags:
 *       - Like
 *     summary: Get liked videos
 *     description: Returns all videos liked by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liked videos fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Liked videos fetched successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */

router.get(
  "/videos",
  verifyJWT,
  likeController.getLikedVideos
);
module.exports = router;