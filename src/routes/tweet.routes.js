const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { tweetSchema } = require("../validations/tweet.validation");

const tweetController = require("../controllers/tweet.controller");
const verifyJWT = require("../middlewares/auth.middleware");

// Create Tweet



/**
 * @swagger
 * /tweets:
 *   post:
 *     tags:
 *       - Tweet
 *     summary: Create a tweet
 *     description: Creates a new tweet for the authenticated user.
 *     security:
 *       - bearerAuth: []
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
 *                 example: Learning Prisma is awesome!
 *     responses:
 *       201:
 *         description: Tweet created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/",
  verifyJWT,
  validate(tweetSchema),
  tweetController.createTweet
);

/**
 * @swagger
 * /tweets:
 *   get:
 *     tags:
 *       - Tweet
 *     summary: Get all tweets
 *     description: Returns all tweets.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tweets fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */

router.get(
  "/",
  verifyJWT,
  tweetController.getAllTweets
);


/**
 * @swagger
 * /tweets/{id}:
 *   patch:
 *     tags:
 *       - Tweet
 *     summary: Update tweet
 *     description: Updates a tweet owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID.
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
 *                 example: Updated tweet content.
 *     responses:
 *       200:
 *         description: Tweet updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Tweet not found.
 */

router.patch(
  "/:id",
  verifyJWT,
  validate(tweetSchema),
  tweetController.updateTweet
);


/**
 * @swagger
 * /tweets/{id}:
 *   delete:
 *     tags:
 *       - Tweet
 *     summary: Delete tweet
 *     description: Deletes a tweet owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tweet ID.
 *     responses:
 *       200:
 *         description: Tweet deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Tweet not found.
 */
router.delete(
  "/:id",
  verifyJWT,
  tweetController.deleteTweet
);

module.exports = router;