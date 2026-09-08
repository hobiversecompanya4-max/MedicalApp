import express from "express";
import { uploadPrescription } from "../controllers/upload.controller.js";
import uploadPrescriptionMiddleware from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Upload routes are working",
  });
});

router.post(
  "/prescription",
  uploadPrescriptionMiddleware.single("prescription"),
  uploadPrescription
);

export default router;