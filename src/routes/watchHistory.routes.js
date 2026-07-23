const express = require("express");
const router = express.Router();

const watchHistoryController = require("../controllers/watchHistory.controller");
const verifyJWT = require("../middlewares/auth.middleware");



/**
 * @swagger
 * /watch-history/{videoId}:
 *   post:
 *     tags:
 *       - Watch History
 *     summary: Add video to watch history
 *     description: Adds a video to the authenticated user's watch history.
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
 *       201:
 *         description: Video added to watch history successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Video not found.
 */
router.post(
  "/:videoId",
  verifyJWT,
  watchHistoryController.addToWatchHistory
);

/**
 * @swagger
 * /watch-history:
 *   get:
 *     tags:
 *       - Watch History
 *     summary: Get watch history
 *     description: Returns the authenticated user's watch history.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watch history fetched successfully.
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
 *                   example: Watch history fetched successfully.
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
  "/",
  verifyJWT,
  watchHistoryController.getWatchHistory
);



/**
 * @swagger
 * /watch-history/{videoId}:
 *   patch:
 *     tags:
 *       - Watch History
 *     summary: Update watch progress
 *     description: Updates the watch progress of a video in the authenticated user's watch history.
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
 *               - progress
 *             properties:
 *               progress:
 *                 type: number
 *                 format: float
 *                 example: 125.5
 *                 description: Current playback position in seconds.
 *     responses:
 *       200:
 *         description: Watch progress updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Watch history entry not found.
 */
router.patch(
  "/:videoId",
  verifyJWT,
  watchHistoryController.updateWatchProgress
);


/**
 * @swagger
 * /watch-history/{videoId}:
 *   delete:
 *     tags:
 *       - Watch History
 *     summary: Remove video from watch history
 *     description: Removes a video from the authenticated user's watch history.
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
 *         description: Video removed from watch history successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Watch history entry not found.
 */
router.delete(
  "/:videoId",
  verifyJWT,
  watchHistoryController.removeFromWatchHistory
);


module.exports = router;