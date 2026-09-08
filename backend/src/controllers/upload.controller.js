import fs from "fs/promises";
import { uploadFile } from "../services/upload.service.js";
import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

const uploadPrescription = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(
        res,
        400,
        "Prescription file is required"
      );
    }

    const uploadedFile = await uploadFile(req.file);

    await fs.unlink(req.file.path).catch(() => {});

    return successResponse(
      res,
      201,
      "Prescription uploaded successfully",
      uploadedFile
    );
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

    return errorResponse(res, 500, error.message);
  }
};

export { uploadPrescription };