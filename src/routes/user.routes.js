const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
} = require("../validations/user.validation");

const userController = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.post(
  "/register",
  validate(registerSchema),
  userController.registerUser
);
router.post(
  "/login",
  validate(loginSchema),
  userController.loginUser
);
router.post("/logout", verifyJWT, userController.logoutUser);
router.post("/refresh-token", userController.refreshAccessToken);
router.get("/me", verifyJWT, userController.getCurrentUser);
router.patch("/change-password", verifyJWT, userController.changePassword);
router.patch("/update-account", verifyJWT, userController.updateAccount);

router.get("/profile", verifyJWT, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

const upload = require("../middlewares/upload.middleware");

router.patch(
  "/avatar",
  verifyJWT,
  upload.single("avatar"),
  userController.updateAvatar
);

router.patch(
  "/cover-image",
  verifyJWT,
  upload.single("coverImage"),
  userController.updateCoverImage
);
router.get(
  "/",
  verifyJWT,
  userController.getAllUsers
);
module.exports = router;