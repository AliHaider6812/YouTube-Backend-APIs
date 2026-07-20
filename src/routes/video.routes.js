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
router.patch(
  "/:id",
  verifyJWT,
  validate(updateVideoSchema),
  videoController.updateVideo
);

router.delete(
  "/:id",
  verifyJWT,
  videoController.deleteVideo
);

router.patch(
  "/toggle-publish/:id",
  verifyJWT,
  videoController.togglePublishStatus
);
router.get("/", videoController.getAllVideos);
router.get("/:id", videoController.getVideoById);
module.exports = router;