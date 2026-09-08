import cloudinary from "../config/cloudinary.js";

const uploadFile = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const isPdf = file.mimetype === "application/pdf";

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "medical-store/prescriptions",
    resource_type: "auto",
    type: "upload",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    isPdf,
  };
};

const deleteFile = async (publicId, resourceType = "image") => {
  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};

export { uploadFile, deleteFile };