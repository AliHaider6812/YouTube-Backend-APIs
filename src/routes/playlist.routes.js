const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  playlistSchema,
  updatePlaylistSchema,
} = require("../validations/playlist.validation");

const playlistController = require("../controllers/playlist.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.post(
  "/",
  verifyJWT,
  validate(playlistSchema),
  playlistController.createPlaylist
);

router.get("/", verifyJWT, playlistController.getMyPlaylists);
router.get("/:id", verifyJWT, playlistController.getPlaylistById);

router.post(
  "/:playlistId/videos/:videoId",
  verifyJWT,
  playlistController.addVideoToPlaylist
);

router.delete(
  "/:playlistId/videos/:videoId",
  verifyJWT,
  playlistController.removeVideoFromPlaylist
);

router.delete(
  "/:id",
  verifyJWT,
  playlistController.deletePlaylist
);
module.exports = router;