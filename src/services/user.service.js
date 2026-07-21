const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../utils/cloudinary");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const registerUser = async (data) => {
  const { username, email, fullName, avatarUrl, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new ApiError(400, "Username or Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      fullName,
      avatarUrl,
      password: hashedPassword,
    },
  });

  logger.info(`New user registered: ${user.email}`);

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    avatarUrl: user.avatarUrl,
    coverImageUrl: user.coverImageUrl,
    createdAt: user.createdAt,
  };
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "Invalid email or password.");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid email or password.");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  logger.info(`User logged in: ${user.email}`);

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    },
    accessToken,
    refreshToken,
  };
};

const logoutUser = async (userId) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });

  logger.info(`User logged out: ${userId}`);

  return true;
};

const refreshAccessToken = async (data) => {
  const { refreshToken } = data;

  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required.");
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (user.refreshToken !== refreshToken) {
    throw new ApiError(400, "Invalid refresh token.");
  }

  const newAccessToken = generateAccessToken(user);

  logger.info(`Access token refreshed for user: ${user.id}`);

  return {
    accessToken: newAccessToken,
  };
};

const getCurrentUser = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      avatarUrl: true,
      coverImageUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const changePassword = async (userId, data) => {
  const { oldPassword, newPassword } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const isPasswordCorrect = await bcrypt.compare(
    oldPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Old password is incorrect.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });

  logger.info(`Password changed for user: ${userId}`);
};

const updateAccount = async (userId, data) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      username: data.username,
      email: data.email,
      fullName: data.fullName,
    },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      avatarUrl: true,
    },
  });

  logger.info(`Account updated for user: ${userId}`);

  return updatedUser;
};

const updateAvatar = async (userId, filePath) => {
  const uploaded = await uploadOnCloudinary(filePath);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      avatarUrl: uploaded.secure_url,
    },
    select: {
      id: true,
      username: true,
      avatarUrl: true,
    },
  });

  logger.info(`Avatar updated for user: ${userId}`);

  return user;
};

const updateCoverImage = async (userId, filePath) => {
  const uploaded = await uploadOnCloudinary(filePath);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      coverImageUrl: uploaded.secure_url,
    },
    select: {
      id: true,
      username: true,
      coverImageUrl: true,
    },
  });

  logger.info(`Cover image updated for user: ${userId}`);

  return user;
};

const getAllUsers = async (loggedInUserId) => {
  return await prisma.user.findMany({
    where: {
      id: {
        not: loggedInUserId, // exclude logged in user
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      avatarUrl: true,
      isVerified: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

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