const cloudinary = require("../config/cloudinary");

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  const result = await cloudinary.uploader.upload(localFilePath, {
    resource_type: "auto",
  });

  return result;
};

module.exports = uploadOnCloudinary;