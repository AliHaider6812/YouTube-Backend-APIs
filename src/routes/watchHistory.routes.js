const express = require("express");
const router = express.Router();

const watchHistoryController = require("../controllers/watchHistory.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.post(
  "/:videoId",
  verifyJWT,
  watchHistoryController.addToWatchHistory
);
router.get(
  "/",
  verifyJWT,
  watchHistoryController.getWatchHistory
);

router.patch(
  "/:videoId",
  verifyJWT,
  watchHistoryController.updateWatchProgress
);
router.delete(
  "/:videoId",
  verifyJWT,
  watchHistoryController.removeFromWatchHistory
);


module.exports = router;