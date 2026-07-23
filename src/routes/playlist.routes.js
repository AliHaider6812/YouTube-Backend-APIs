const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  playlistSchema,
  updatePlaylistSchema,
} = require("../validations/playlist.validation");

const playlistController = require("../controllers/playlist.controller");
const verifyJWT = require("../middlewares/auth.middleware");






/**
 * @swagger
 * /playlists:
 *   post:
 *     tags:
 *       - Playlist
 *     summary: Create a playlist
 *     description: Creates a new playlist for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Favorites
 *               description:
 *                 type: string
 *                 example: Collection of my favorite videos.
 *     responses:
 *       201:
 *         description: Playlist created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.post(
  "/",
  verifyJWT,
  validate(playlistSchema),
  playlistController.createPlaylist
);


/**
 * @swagger
 * /playlists:
 *   get:
 *     tags:
 *       - Playlist
 *     summary: Get my playlists
 *     description: Returns all playlists created by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Playlists fetched successfully.
 *       401:
 *         description: Unauthorized.
 */

router.get("/", verifyJWT, playlistController.getMyPlaylists);

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     tags:
 *       - Playlist
 *     summary: Get playlist by ID
 *     description: Returns a playlist along with its videos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID.
 *     responses:
 *       200:
 *         description: Playlist fetched successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Playlist not found.
 */

router.get("/:id", verifyJWT, playlistController.getPlaylistById);


/**
 * @swagger
 * /playlists/{playlistId}/videos/{videoId}:
 *   post:
 *     tags:
 *       - Playlist
 *     summary: Add video to playlist
 *     description: Adds a video to a playlist owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video added successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Playlist or video not found.
 */
router.post(
  "/:playlistId/videos/:videoId",
  verifyJWT,
  playlistController.addVideoToPlaylist
);


/**
 * @swagger
 * /playlists/{playlistId}/videos/{videoId}:
 *   delete:
 *     tags:
 *       - Playlist
 *     summary: Remove video from playlist
 *     description: Removes a video from a playlist owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video removed successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Playlist or video not found.
 */
router.delete(
  "/:playlistId/videos/:videoId",
  verifyJWT,
  playlistController.removeVideoFromPlaylist
);



/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     tags:
 *       - Playlist
 *     summary: Delete playlist
 *     description: Deletes a playlist owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID.
 *     responses:
 *       200:
 *         description: Playlist deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Playlist not found.
 */

router.delete(
  "/:id",
  verifyJWT,
  playlistController.deletePlaylist
);
module.exports = router;
