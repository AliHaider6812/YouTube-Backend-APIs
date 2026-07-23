const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  uploadVideoSchema,
  updateVideoSchema,
} = require("../validations/video.validation");


const videoController = require("../controllers/video.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");


/**
 * @swagger
 * /videos/upload:
 *   post:
 *     tags:
 *       - Video
 *     summary: Upload a new video
 *     description: Uploads a video along with its thumbnail. Authentication is required.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - video
 *               - thumbnail
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Video
 *               description:
 *                 type: string
 *                 example: This is my first uploaded video.
 *               video:
 *                 type: string
 *                 format: binary
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Video uploaded successfully.
 *       400:
 *         description: Validation failed or required files are missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.post(
  "/upload",
  verifyJWT,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  validate(uploadVideoSchema),
  videoController.uploadVideo
);



/**
 * @swagger
 * /videos/{id}:
 *   patch:
 *     tags:
 *       - Video
 *     summary: Update a video
 *     description: Updates the title and description of a video. Only the owner can update the video.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique video ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Video Title
 *               description:
 *                 type: string
 *                 example: Updated video description.
 *     responses:
 *       200:
 *         description: Video updated successfully.
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
 *                   example: Video updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Video not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error.
 */
router.patch(
  "/:id",
  verifyJWT,
  validate(updateVideoSchema),
  videoController.updateVideo
);


/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     tags:
 *       - Video
 *     summary: Delete a video
 *     description: Deletes a video owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique video ID.
 *     responses:
 *       200:
 *         description: Video deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Video not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error.
 */
router.delete(
  "/:id",
  verifyJWT,
  videoController.deleteVideo
);



/**
 * @swagger
 * /videos/toggle-publish/{id}:
 *   patch:
 *     tags:
 *       - Video
 *     summary: Toggle publish status
 *     description: Publishes or unpublishes a video owned by the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique video ID.
 *     responses:
 *       200:
 *         description: Video publish status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Video not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error.
 */

router.patch(
  "/toggle-publish/:id",
  verifyJWT,
  videoController.togglePublishStatus
);


/**
 * @swagger
 * /videos:
 *   get:
 *     tags:
 *       - Video
 *     summary: Get all videos
 *     description: Returns a paginated list of videos. Supports search by title.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of videos per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search videos by title.
 *     responses:
 *       200:
 *         description: Videos fetched successfully.
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
 *                   example: Videos fetched successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Video'
 *       500:
 *         description: Internal Server Error.
 */
router.get("/", videoController.getAllVideos);


/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     tags:
 *       - Video
 *     summary: Get video by ID
 *     description: Returns a single video by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique video ID.
 *     responses:
 *       200:
 *         description: Video fetched successfully.
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
 *                   example: Video fetched successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *       404:
 *         description: Video not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error.
 */
router.get("/:id", videoController.getVideoById);
module.exports = router;