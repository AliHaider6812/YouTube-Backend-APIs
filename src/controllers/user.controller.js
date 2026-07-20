const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");

const registerUser = asyncHandler(async (req, res) => {
  const user = await userService.registerUser(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await userService.loginUser(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Login successful."));
});

const logoutUser = asyncHandler(async (req, res) => {
  await userService.logoutUser(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logout successful."));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const data = await userService.refreshAccessToken(req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Access token refreshed successfully."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userService.getCurrentUser(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully."));
});

const changePassword = asyncHandler(async (req, res) => {
  await userService.changePassword(req.user.id, req.body);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully."));
});

const updateAccount = asyncHandler(async (req, res) => {
  const user = await userService.updateAccount(
    req.user.id,
    req.body
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account updated successfully."));
});

const updateAvatar = asyncHandler(async (req, res) => {
  const user = await userService.updateAvatar(
    req.user.id,
    req.file.path
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully."));
});

const updateCoverImage = asyncHandler(async (req, res) => {
  const user = await userService.updateCoverImage(
    req.user.id,
    req.file.path
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully."));
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully."));
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  updateAccount,
  updateAvatar,
  updateCoverImage,
  getAllUsers,
};