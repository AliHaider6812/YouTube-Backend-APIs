const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
} = require("../validations/user.validation");

const userController = require("../controllers/user.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Authentication and Profile APIs
 */

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: Creates a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Validation failed or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/register",
  validate(registerSchema),
  userController.registerUser
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login a user
 *     description: Authenticates a user using email and password and returns JWT access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/login",
  validate(loginSchema),
  userController.loginUser
);


/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Logout user
 *     description: Logs out the authenticated user by clearing the refresh token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized.
 */
router.post("/logout", verifyJWT, userController.logoutUser);


/**
 * @swagger
 * /users/refresh-token:
 *   post:
 *     tags:
 *       - User
 *     summary: Refresh access token
 *     description: Generates a new access token using a valid refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Access token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         description: Invalid or expired refresh token.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/refresh-token", userController.refreshAccessToken);


/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - User
 *     summary: Get current user
 *     description: Returns the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentUserResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/me", verifyJWT, userController.getCurrentUser);

/**
 * @swagger
 * /users/change-password:
 *   patch:
 *     tags:
 *       - User
 *     summary: Change password
 *     description: Allows the authenticated user to change their password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangePasswordResponse'
 *       400:
 *         description: Invalid old password or validation error.
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.patch("/change-password", verifyJWT, userController.changePassword);


/**
 * @swagger
 * /users/update-account:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update account details
 *     description: Updates the authenticated user's username, email, and full name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAccountRequest'
 *     responses:
 *       200:
 *         description: Account updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateAccountResponse'
 *       400:
 *         description: Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.patch("/update-account", verifyJWT, userController.updateAccount);


/**
 * @swagger
 * /users/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get authenticated user profile
 *     description: Returns the profile information of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */

router.get("/profile", verifyJWT, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});






/**
 * @swagger
 * /users/avatar:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update user avatar
 *     description: Uploads a new avatar image for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - avatar
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid file upload.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.patch(
  "/avatar",
  verifyJWT,
  upload.single("avatar"),
  userController.updateAvatar
);





/**
 * @swagger
 * /users/cover-image:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update cover image
 *     description: Uploads a new cover image for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - coverImage
 *             properties:
 *               coverImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Cover image updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid file upload.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */

router.patch(
  "/cover-image",
  verifyJWT,
  upload.single("coverImage"),
  userController.updateCoverImage
);


/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     description: Returns a list of all users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully.
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
 *                   example: Users fetched successfully.
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized.
 *       500:
 *         description: Internal Server Error.
 */
router.get(
  "/",
  verifyJWT,
  userController.getAllUsers
);
module.exports = router;
