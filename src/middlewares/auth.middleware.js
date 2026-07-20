const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

const verifyJWT = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user in database
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        coverImageUrl: true,
        createdAt: true,
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Save user in request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = verifyJWT;