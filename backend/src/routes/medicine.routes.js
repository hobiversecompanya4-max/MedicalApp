import express from "express";

import {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicine.controller.js";

import adminProtect from "../middleware/adminAuth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";
import validateMedicine from "../validators/medicine.validator.js";
import uploadMedicineImage from "../middleware/imageUpload.middleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Medicine routes are working",
  });
});

router.get("/", getAllMedicines);

router.get("/:id", getMedicineById);

router.post(
  "/",
  adminProtect,
  adminOnly,
  uploadMedicineImage.single("image"),
  validateMedicine,
  createMedicine
);

router.put(
  "/:id",
  adminProtect,
  adminOnly,
  uploadMedicineImage.single("image"),
  validateMedicine,
  updateMedicine
);

router.delete(
  "/:id",
  adminProtect,
  adminOnly,
  deleteMedicine
);

export default router;